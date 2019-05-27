
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_inventory_transfer_item(
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  numeric,
  numeric,
  leaf.uom,
  text,
  numeric,
  text,
  boolean,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
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
CREATE OR REPLACE FUNCTION leaf.capture_lf_inventory_transfer_item(
  _created_at text,
  _updated_at text,
  _external_id text,
  _is_sample boolean,
  _sample_type text,
  _product_sample_type text,
  _description text,
  _qty numeric(20,2),
  _price numeric(20,2),
  _uom leaf.uom,
  _received_at text,
  _received_qty numeric(20,2),
  _deleted_at text,
  _retest boolean,
  _global_id text,
  _is_for_extraction boolean,
  _inventory_name text,
  _strain_name text,
  _global_mme_id text,
  _global_user_id text,
  _global_batch_id text,
  _global_plant_id text,
  _global_inventory_id text,
  _global_lab_result_id text,
  _global_received_area_id text,
  _global_received_strain_id text,
  _global_inventory_transfer_id text,
  _global_received_batch_id text,
  _global_received_inventory_id text,
  _global_received_plant_id text,
  _global_received_mme_id text,
  _global_received_mme_user_id text,
  _global_customer_id text,
  _global_inventory_type_id text,
  _seller_id uuid
)
RETURNS leaf.lf_inventory_transfer_item
as $$
DECLARE
  _inventory_type soro.inventory_type;
  _seller leaf.lf_seller_view;
  _lf_inventory_type leaf.lf_inventory_type;
  _lf_inventory_transfer leaf.lf_inventory_transfer;
  _lf_inventory_transfer_item leaf.lf_inventory_transfer_item;
  _order_info soro.order_info;
  _order_line_item soro.order_line_item;
  _strain soro.strain;
  _category_name text;
  _inventory_group soro.inventory_group;
  _inventory_lot soro.inventory_lot;
  _import_result leaf.lf_import_result;
  _import_message text;
BEGIN
  _import_result := 'Imported';

  -- seller
  SELECT *
  INTO _seller
  FROM leaf.lf_seller_view
  WHERE global_mme_id = _global_mme_id;

  -- lf_inventory_type
  SELECT *
  INTO _lf_inventory_type
  FROM leaf.lf_inventory_type
  WHERE global_id = _global_inventory_type_id
  ORDER BY updated_at DESC
  LIMIT 1;
  
  IF _lf_inventory_type.id IS NULL THEN
    _import_result := 'Error';
    _import_message := 'No lf_inventory_type global_id: ' || _global_inventory_type_id;
  END IF;

 --RAISE NOTICE '_lf_inventory_type: %', _lf_inventory_type;
 --RAISE EXCEPTION '_global_inventory_type_id: %', _global_inventory_type_id;

  -- strain
  SELECT *
  INTO _strain
  FROM soro.strain
  WHERE seller_id = _seller_id
  AND name = _strain_name;
  
  IF _strain.id IS NULL THEN
    _import_result := 'Error';
    _import_message := 'Missing strain';
  END IF;

  SELECT *
  INTO _lf_inventory_transfer_item
  FROM leaf.lf_inventory_transfer_item
  WHERE global_id = _global_id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _lf_inventory_transfer_item.id IS NULL OR _lf_inventory_transfer_item.updated_at < _updated_at::timestamp THEN
    INSERT INTO leaf.lf_inventory_transfer_item(
      created_at,
      updated_at,
      external_id,
      is_sample,
      sample_type,
      product_sample_type,
      description,
      qty,
      price,
      uom,
      received_at,
      received_qty,
      deleted_at,
      retest,
      global_id,
      is_for_extraction,
      inventory_name,
      strain_name,
      global_mme_id,
      global_user_id,
      global_batch_id,
      global_plant_id,
      global_inventory_id,
      global_lab_result_id,
      global_received_area_id,
      global_received_strain_id,
      global_inventory_transfer_id,
      global_received_batch_id,
      global_received_inventory_id,
      global_received_plant_id,
      global_received_mme_id,
      global_received_mme_user_id,
      global_customer_id,
      global_inventory_type_id,
      order_line_item_id,
      inventory_lot_id,
      import_result,
      import_message,
      seller_id
    )
    SELECT
      _created_at::timestamp,
      _updated_at::timestamp,
      _external_id,
      _is_sample,
      _sample_type,
      _product_sample_type,
      _description,
      _qty,
      _price,
      _uom,
      CASE WHEN _received_at = '' THEN null::timestamp ELSE _received_at::timestamp END,
      _received_qty,
      CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
      _retest,
      _global_id,
      _is_for_extraction,
      _inventory_name,
      _strain_name,
      _global_mme_id,
      _global_user_id,
      _global_batch_id,
      _global_plant_id,
      _global_inventory_id,
      _global_lab_result_id,
      _global_received_area_id,
      _global_received_strain_id,
      _global_inventory_transfer_id,
      _global_received_batch_id,
      _global_received_inventory_id,
      _global_received_plant_id,
      _global_received_mme_id,
      _global_received_mme_user_id,
      _global_customer_id,
      _global_inventory_type_id,
      _order_line_item.id,
      _inventory_lot.id,
      _import_result,
      _import_message,
      _seller_id
    RETURNING * INTO _lf_inventory_transfer_item;
  END IF;

--  RAISE NOTICE '_inventory_lot: %', _inventory_lot;
--  RAISE NOTICE '_order_line_item: %', _order_line_item;
--  RAISE NOTICE '_seller: %', _seller;
--  RAISE NOTICE '_strain: %', _strain;
--  RAISE NOTICE '_product: %', _product;
--  RAISE NOTICE '_order_info: %', _order_info;
--  RAISE NOTICE '_lf_inventory_type: %', _lf_inventory_type;
--  RAISE NOTICE '_lf_inventory_transfer: %', _lf_inventory_transfer;
--  RAISE EXCEPTION '_lf_inventory_transfer_item: %', _lf_inventory_transfer_item;

  RETURN _lf_inventory_transfer_item;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_inventory_transfer_item(
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  numeric,
  numeric,
  leaf.uom,
  text,
  numeric,
  text,
  boolean,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  uuid
) TO soro_user;
`
