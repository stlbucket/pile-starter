
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_sale_item(
  text,
  text,
  text,
  text,
  text,
  text,
  numeric,
  leaf.uom,
  numeric,
  numeric,
  numeric,
  numeric,
  text,
  text,
  text,
  text,
  text,
  numeric,
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
CREATE OR REPLACE FUNCTION leaf.capture_lf_sale_item(
  _created_at text,
  _updated_at text,
  _external_id text,
  _use_by_date text,
  _description text,
  _sold_at text,
  _qty numeric(20,2),
  _uom leaf.uom,
  _unit_price numeric(20,2),
  _discount_total numeric(20,2),
  _price_total numeric(20,2),
  _tax_total numeric(20,2),
  _potency text,
  _returned_reason text,
  _returned_at text,
  _total_marijuana_in_grams text,
  _name text,
  _unit_cog numeric(20,2),
  _deleted_at text,
  _global_id text,
  _global_mme_id text,
  _global_user_id text,
  _global_sale_id text,
  _global_batch_id text,
  _global_returned_by_user_id text,
  _global_inventory_id text
)
RETURNS leaf.lf_sale_item
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _sale_item leaf.lf_sale_item;
  _inventory_type soro.inventory_type;
  _import_result leaf.lf_import_result;
  _import_message text;
BEGIN
  _import_result := 'Imported';

  --get the seller
  SELECT *
  INTO _seller
  FROM leaf.lf_seller_view
  WHERE global_mme_id = _global_mme_id;

  IF _seller.id IS NULL THEN
    RAISE EXCEPTION 'No seller for _seller.id: %', _seller.id;
  END IF;
  
  SELECT *
  INTO _sale_item
  FROM leaf.lf_sale_item
  WHERE global_id = _global_id
  AND seller_id = _seller.id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _sale_item.id IS NULL OR _sale_item.updated_at::timestamp < _updated_at::timestamp THEN
    INSERT INTO leaf.lf_sale_item(
      created_at,
      updated_at,
      external_id,
      use_by_date,
      description,
      sold_at,
      qty,
      uom,
      unit_price,
      discount_total,
      price_total,
      tax_total,
      potency,
      returned_reason,
      returned_at,
      total_marijuana_in_grams,
      name,
      unit_cog,
      deleted_at,
      global_id,
      global_mme_id,
      global_user_id,
      global_sale_id,
      global_batch_id,
      global_returned_by_user_id,
      global_inventory_id,
      import_result,
      import_message,
      order_line_item_id,
      inventory_lot_id,
      seller_id
    )
    SELECT
      CASE WHEN _created_at = '' THEN null::timestamp ELSE _created_at::timestamp END,
      CASE WHEN _updated_at = '' THEN null::timestamp ELSE _updated_at::timestamp END,
      _external_id,
      _use_by_date,
      _description,
      CASE WHEN _sold_at = '' THEN null::timestamp ELSE _sold_at::timestamp END,
      _qty,
      _uom,
      _unit_price,
      _discount_total,
      _price_total,
      _tax_total,
      _potency,
      _returned_reason,
      CASE WHEN _returned_at = '' THEN null::timestamp ELSE _returned_at::timestamp END,
      _total_marijuana_in_grams,
      _name,
      _unit_cog,
      CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
      _global_id,
      _global_mme_id,
      _global_user_id,
      _global_sale_id,
      _global_batch_id,
      _global_returned_by_user_id,
      _global_inventory_id,
      _import_result,
      _import_message,
      _sale_item.order_line_item_id,
      _sale_item.inventory_lot_id,
      _seller.id
    RETURNING * INTO _sale_item;
  END IF;

  RETURN _sale_item;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_sale_item(
  text,
  text,
  text,
  text,
  text,
  text,
  numeric,
  leaf.uom,
  numeric,
  numeric,
  numeric,
  numeric,
  text,
  text,
  text,
  text,
  text,
  numeric,
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
