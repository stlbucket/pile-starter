
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.delete_seller_leaf_data(
  text,
  boolean
);

`
const upScript = `
CREATE OR REPLACE FUNCTION leaf.delete_seller_leaf_data(
  _state_location_id text,
  _uncapture boolean
)
RETURNS jsonb
as $$
DECLARE
  _inventory_lot soro.inventory_lot;
  _seller leaf.lf_seller_view;
  _summary jsonb;
  _count integer;
BEGIN
  SELECT *
  INTO _seller
  FROM leaf.lf_seller_view
  WHERE state_location_id = _state_location_id;

  _summary := '{}';
  SELECT _summary || jsonb_build_object('seller_id', _seller.id) INTO _summary;
  SELECT _summary || jsonb_build_object('seller_name', _seller.name) INTO _summary;

  DELETE FROM soro.order_line_item
  WHERE id IN (
    SELECT order_line_item_id
    FROM leaf.lf_inventory_transfer_item
    WHERE seller_id = _seller.id
  );

  DELETE FROM soro.order_info
  WHERE id IN (
    SELECT order_info_id
    FROM leaf.lf_inventory_transfer
    WHERE seller_id = _seller.id
  );

  DELETE FROM soro.product
  WHERE seller_id = _seller.id;

  DELETE FROM soro.inventory_group
  WHERE seller_id = _seller.id;

  DELETE FROM soro.inventory_lot
  WHERE id IN (
    SELECT inventory_lot_id FROM leaf.lf_inventory_item WHERE seller_id = _seller.id
  )
  AND seller_id = _seller.id;

  IF _uncapture = true THEN
    DELETE FROM leaf.lf_inventory_transfer_item
    WHERE seller_id = _seller.id;

    DELETE FROM leaf.lf_inventory_transfer
    WHERE seller_id = _seller.id;

    DELETE FROM leaf.lf_inventory_item
    WHERE seller_id = _seller.id;

    DELETE FROM leaf.lf_inventory_type
    WHERE seller_id = _seller.id;
  ELSE
    UPDATE leaf.lf_inventory_transfer_item
    SET import_result = 'Imported'
    WHERE seller_id = _seller.id
    AND import_result = 'Processed';

    UPDATE leaf.lf_inventory_transfer
    SET import_result = 'Imported'
    WHERE seller_id = _seller.id
    AND import_result = 'Processed';

    UPDATE leaf.lf_inventory_item
    SET import_result = 'Imported'
    WHERE seller_id = _seller.id
    AND import_result = 'Processed';

    UPDATE leaf.lf_inventory_type
    SET import_result = 'Imported'
    WHERE seller_id = _seller.id
    AND import_result = 'Processed';
  END IF;

-- RAISE EXCEPTION 'HEY NOW: %', _summary;
  RETURN _summary;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.delete_seller_leaf_data(
  text,
  boolean
) TO soro_user;
`
