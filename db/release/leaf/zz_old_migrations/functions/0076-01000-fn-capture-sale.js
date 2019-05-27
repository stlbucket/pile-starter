
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_sale(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  numeric,
  numeric,
  numeric,
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
CREATE OR REPLACE FUNCTION leaf.capture_lf_sale(
  _created_at text,
  _updated_at text,
  _external_id text,
  _global_customer_id text,
  _patient_medical_id text,
  _sold_at text,
  _sold_to text,
  _type text,
  _discount_total numeric(20,2),
  _price_total numeric(20,2),
  _tax_total numeric(20,2),
  _reason text,
  _status text,
  _cog_total numeric(20,2),
  _deleted_at text,
  _global_id text,
  _global_caregiver_id text,
  _caregiver_id text,
  _global_mme_id text,
  _global_user_id text,
  _global_sold_by_user_id text,
  _global_area_id text
)
RETURNS leaf.lf_sale
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _sale leaf.lf_sale;
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
  INTO _sale
  FROM leaf.lf_sale
  WHERE global_id = _global_id
  AND seller_id = _seller.id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _sale.id IS NULL OR _sale.updated_at::timestamp < _updated_at::timestamp THEN
    INSERT INTO leaf.lf_sale(
      created_at,
      updated_at,
      external_id,
      global_customer_id,
      patient_medical_id,
      sold_at,
      sold_to,
      type,
      discount_total,
      price_total,
      tax_total,
      reason,
      status,
      cog_total,
      deleted_at,
      global_id,
      global_caregiver_id,
      caregiver_id,
      global_mme_id,
      global_user_id,
      global_sold_by_user_id,
      global_area_id,
      import_result,
      import_message,
      order_info_id,
      seller_id
    )
    SELECT
      CASE WHEN _created_at = '' THEN null::timestamp ELSE _created_at::timestamp END,
      CASE WHEN _updated_at = '' THEN null::timestamp ELSE _updated_at::timestamp END,
      _external_id,
      _global_customer_id,
      _patient_medical_id,
      CASE WHEN _sold_at = '' THEN null::timestamp ELSE _sold_at::timestamp END,
      _sold_to,
      _type,
      _discount_total,
      _price_total,
      _tax_total,
      _reason,
      _status,
      _cog_total,
      CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
      _global_id,
      _global_caregiver_id,
      _caregiver_id,
      _global_mme_id,
      _global_user_id,
      _global_sold_by_user_id,
      _global_area_id,
      _import_result,
      _import_message,
      _sale.order_info_id,
      _seller.id
    RETURNING * INTO _sale;
  END IF;

  RETURN _sale;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_sale(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  numeric,
  numeric,
  numeric,
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
