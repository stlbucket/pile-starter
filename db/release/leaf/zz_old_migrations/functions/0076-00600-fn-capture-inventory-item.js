
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_inventory_item(
  text,
  text,
  text,
  text,
  BOOLEAN,
  text,
  text,
  NUMERIC,
  leaf.uom,
  BOOLEAN,
  text,
  BOOLEAN,
  text,
  text,
  text,
  BOOLEAN,
  text,
  text,
  leaf.batch_type,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.capture_lf_inventory_item(
  _created_at text,
  _updated_at text,
  _external_id text,
  _lab_retest_id text,
  _is_initial_inventory BOOLEAN,
  _inventory_created_at text,
  _inventory_packaged_at text,
  _qty NUMERIC(20,2),
  _uom leaf.uom,
  _sent_for_testing BOOLEAN,
  _deleted_at text,
  _medically_compliant BOOLEAN,
  _global_id text,
  _legacy_id text,
  _lab_result_file_path text,
  _lab_results_attested BOOLEAN,
  _lab_results_date text,
  _global_original_id text,
  _batch_type leaf.batch_type,
  _global_mme_id text,
  _global_user_id text,
  _global_batch_id text,
  _global_area_id text,
  _global_lab_result_id text,
  _global_strain_id text,
  _global_inventory_type_id text,
  _global_created_by_mme_id text
)
RETURNS leaf.lf_inventory_item
as $$
DECLARE
  _seller_id uuid;
  _soro_inventory_type soro.inventory_type;
  _category_name text;
  _lf_inventory_item leaf.lf_inventory_item;
  _lf_inventory_type leaf.lf_inventory_type;
  _lf_area leaf.lf_area;
  _inventory_lot soro.inventory_lot;
  _inventory_group soro.inventory_group;
  _strain soro.strain;
  _import_result leaf.lf_import_result;
  _import_message text;
BEGIN
  _import_result := 'Imported';
  SELECT id
  INTO _seller_id
  FROM leaf.lf_seller_view
  WHERE global_mme_id = _global_mme_id;

  SELECT *
  INTO _lf_inventory_type
  FROM leaf.lf_inventory_type
  WHERE global_id = _global_inventory_type_id
  AND seller_id = _seller_id;

  SELECT *
  INTO _lf_area
  FROM leaf.lf_area
  WHERE global_id = _global_area_id
  AND seller_id = _seller_id;

  -- IF _area.id IS NULL THEN
  --   _import_result := 'Error';
  --   _import_message := 'Missing area';
  -- END IF;

  IF _import_result = 'Imported' THEN
    SELECT ss.*
    INTO _strain
    FROM soro.strain ss
    JOIN leaf.lf_strain ls ON ls.strain_id = ss.id
    WHERE ls.global_id = _global_strain_id;
  
    IF _strain.id IS NULL THEN
      _import_result := 'Error';
      _import_message := 'Missing strain';
    END IF;
  END IF;

  IF _import_result = 'Imported' THEN
    SELECT *
    INTO _soro_inventory_type
    FROM soro.inventory_type
    WHERE id = _lf_inventory_type.inventory_type_id;
  
    IF _soro_inventory_type.id IS NULL THEN
      _import_result := 'Error';
      _import_message := 'Missing inventory type';
    END IF;
  END IF;

  SELECT *
  INTO _lf_inventory_item
  FROM leaf.lf_inventory_item
  WHERE global_id = _global_id
  AND seller_id = _seller_id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _lf_inventory_item.id IS NULL OR (_lf_inventory_item.updated_at::timestamp < _updated_at::timestamp) THEN
    INSERT INTO leaf.lf_inventory_item(
      created_at,
      updated_at,
      external_id,
      lab_retest_id,
      is_initial_inventory,
      inventory_created_at,
      inventory_packaged_at,
      qty,
      uom,
      sent_for_testing,
      deleted_at,
      medically_compliant,
      global_id,
      legacy_id,
      lab_result_file_path,
      lab_results_attested,
      lab_results_date,
      global_original_id,
      batch_type,
      global_mme_id,
      global_user_id,
      global_batch_id,
      global_area_id,
      global_lab_result_id,
      global_strain_id,
      global_inventory_type_id,
      global_created_by_mme_id,
      inventory_lot_id,
      import_result,
      import_message,
      seller_id
    )
    SELECT
      _created_at::timestamp,
      _updated_at::timestamp,
      _external_id,
      _lab_retest_id,
      _is_initial_inventory,
      CASE WHEN _inventory_created_at = '' THEN null::timestamp ELSE _inventory_created_at::timestamp END,
      CASE WHEN _inventory_packaged_at = '' THEN null::timestamp ELSE _inventory_packaged_at::timestamp END,
      _qty,
      _uom,
      _sent_for_testing,
      CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
      _medically_compliant,
      _global_id,
      _legacy_id,
      _lab_result_file_path,
      _lab_results_attested,
      CASE WHEN _lab_results_date = '' THEN null::timestamp ELSE _lab_results_date::timestamp END,
      _global_original_id,
      _batch_type,
      _global_mme_id,
      _global_user_id,
      _global_batch_id,
      _global_area_id,
      _global_lab_result_id,
      _global_strain_id,
      _global_inventory_type_id,
      _global_created_by_mme_id,
      _inventory_lot.id,
      _import_result,
      _import_message,
      _seller_id
    RETURNING *
    INTO _lf_inventory_item;
  END IF;

--  RAISE EXCEPTION '
--    seller_id: %
--    product:    %      ......     %      ......     %
--    strain:     %      ......     %      ......     %
--    inventory_lot:   %  ......  %  ...... %  ...... %
--    lf_inventory_item:  % ....  %
--    ',
--    _seller_id,
--    _product.category_name, _product.display_name, _product.id,
--    _strain.external_id, _strain.name, _strain.id,
--    _inventory_lot.external_id, _inventory_lot.category_name, _inventory_lot.display_name, _inventory_lot.id,
--    _lf_inventory_item.global_id, _lf_inventory_item.id
--    ;

--RAISE EXCEPTION 'DONE:  %', _lf_inventory_item;

  RETURN _lf_inventory_item;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_inventory_item(
  text,
  text,
  text,
  text,
  BOOLEAN,
  text,
  text,
  NUMERIC,
  leaf.uom,
  BOOLEAN,
  text,
  BOOLEAN,
  text,
  text,
  text,
  BOOLEAN,
  text,
  text,
  leaf.batch_type,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) TO soro_user;
`
