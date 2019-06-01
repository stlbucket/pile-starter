
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.process_lf_inventory_items(
  uuid
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.process_lf_inventory_items(
  _seller_id uuid
)
RETURNS jsonb
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _lf_inventory_item leaf.lf_inventory_item;
  _lf_inventory_type leaf.lf_inventory_type;
  _lf_area leaf.lf_area;
  _strain soro.strain;
  _inventory_type soro.inventory_type;
  _inventory_group soro.inventory_group;
  _inventory_lot soro.inventory_lot;
  _category_name text;
  _items_processed_count integer;
  _summary jsonb;
BEGIN
  _items_processed_count := 0;

  SELECT *
  INTO _seller
  FROM leaf.lf_seller_view
  WHERE id = _seller_id;

  --initialize our summary
  _summary := '{}';
  SELECT _summary || jsonb_build_object('seller_id', _seller.id) INTO _summary;
  SELECT _summary || jsonb_build_object('seller_name', _seller.name) INTO _summary;

  FOR _lf_inventory_item IN
    SELECT lii.*
    FROM leaf.lf_inventory_item lii
    WHERE seller_id = _seller_id
    AND import_result = 'Imported'
  LOOP
    SELECT *
    INTO _lf_inventory_type
    FROM leaf.lf_inventory_type
    WHERE global_id = _lf_inventory_item.global_inventory_type_id
    AND seller_id = _seller.id;

    SELECT ss.*
    INTO _strain
    FROM soro.strain ss
    JOIN leaf.lf_strain ls ON ls.strain_id = ss.id
    WHERE ls.global_id =  _lf_inventory_item.global_strain_id;

    SELECT *
    INTO _inventory_type
    FROM soro.inventory_type
    WHERE id = _lf_inventory_type.inventory_type_id;

    SELECT invg.*
    INTO _inventory_group
    FROM soro.inventory_group invg
    WHERE invg.name = _lf_inventory_type.name || ' - ' || _strain.name
    AND invg.seller_id = _seller.id
    AND invg.strain_id = _strain.id
    AND invg.inventory_type_id = _inventory_type.id
    ;

    IF _inventory_group.id IS NULL THEN
      INSERT INTO soro.inventory_group(
        seller_id,
        inventory_type_id,
        strain_id,
        name,
        base_product_name
      )
      SELECT
        _seller_id,
        _inventory_type.id,
        _strain.id,
        _lf_inventory_type.name || ' - ' || _strain.name,
        _lf_inventory_type.name
      RETURNING *
      INTO _inventory_group;
    END IF;

    -- inventory lot
    SELECT *
    INTO _inventory_lot
    FROM soro.inventory_lot
    WHERE external_id = _lf_inventory_item.global_id
    AND seller_id = _seller.id;

    SELECT *
    INTO _lf_area
    FROM leaf.lf_area
    WHERE global_id = _lf_inventory_item.global_area_id
    AND seller_id = _seller.id;

    IF _inventory_lot.id IS NULL THEN
      SELECT ic.name
      INTO _category_name
      FROM soro.inventory_type it
      JOIN soro.seller_inventory_type_category sitc ON it.id = sitc.inventory_type_id
      JOIN soro.inventory_category ic ON ic.id = sitc.inventory_category_id
      WHERE it.id = _inventory_type.id
      AND sitc.seller_id = _seller.id;

      INSERT INTO soro.inventory_lot(
        category_name,
        description,
        inventory_type_id,
        strain_id,
        remaining_quantity,
        status,
        external_id,
        inventory_group_id,
        room_id,
        seller_id
      )
      SELECT
        _category_name,
        _lf_inventory_type.name,
        _inventory_type.id,
        _strain.id,
        _lf_inventory_item.qty,
        CASE
          WHEN _lf_inventory_item.deleted_at IS NOT NULL THEN
            'Deleted'::soro.inventory_lot_status
          WHEN _lf_inventory_item.qty > 0 THEN
            'Available'::soro.inventory_lot_status
          ELSE
            'Depleted'::soro.inventory_lot_status
        END,
        _lf_inventory_item.global_id,
        _inventory_group.id,
        _lf_area.room_id,
        _seller.id
      RETURNING *
      INTO _inventory_lot
      ;
    ELSE
      UPDATE soro.inventory_lot
      SET
        description = _lf_inventory_type.name,
        inventory_type_id = _inventory_type.id,
        strain_id = _strain.id,
        remaining_quantity = _lf_inventory_item.qty,
        room_id = _lf_area.room_id,
        status = CASE
          WHEN _lf_inventory_item.deleted_at IS NOT NULL THEN
            'Deleted'::soro.inventory_lot_status
          WHEN _lf_inventory_item.qty > 0 THEN
            'Available'::soro.inventory_lot_status
          ELSE
            'Depleted'::soro.inventory_lot_status
        END,
        inventory_group_id = _inventory_group.id
      WHERE id = _inventory_lot.id
      ;
    END IF;  -- end inventory_lot

--    RAISE NOTICE '_lf_inventory_item: %', _lf_inventory_item;
--    RAISE NOTICE '_lf_inventory_type: %', _lf_inventory_type;
--    RAISE NOTICE '_strain: %', _strain;
--    RAISE NOTICE '_inventory_type: %', _inventory_type;
--    RAISE NOTICE '_inventory_group: %', _inventory_group;
--    RAISE EXCEPTION '_inventory_lot: %', _inventory_lot;
    _items_processed_count := _items_processed_count + 1;

    UPDATE leaf.lf_inventory_item
    SET
      inventory_lot_id = _inventory_lot.id,
      import_result = 'Processed'
    WHERE id = _lf_inventory_item.id;
  END LOOP; -- lf_inventory_item

  PERFORM leaf.calculate_inventory_levels(_seller_id);

  SELECT _summary || jsonb_build_object('_items_processed_count', _items_processed_count) INTO _summary;

--  RAISE EXCEPTION 'summary: %', _summary;

  RETURN _summary;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.process_lf_inventory_items(
  uuid
) TO soro_user;
`
