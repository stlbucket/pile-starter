
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.generate_seller_product_set(
  text
);
`
const upScript = `
CREATE OR REPLACE FUNCTION leaf.generate_seller_product_set(
  _state_location_id text
)
RETURNS jsonb
as $$
DECLARE
  _seller soro.seller_view;
  _summary jsonb;
  _product_count integer;
BEGIN
  _summary := '{}';

  SELECT *
  INTO _seller
  FROM soro.seller_view
  WHERE state_location_id = _state_location_id;

  SELECT _summary || jsonb_build_object('seller_id', _seller.id) INTO _summary;
  SELECT _summary || jsonb_build_object('seller_name', _seller.name) INTO _summary;

  PERFORM leaf.generate_seller_each_weight_product_set(_state_location_id);
  PERFORM leaf.generate_seller_conversion_product_set(_state_location_id);

  UPDATE soro.product prd
  SET
    physical_units = (
      SELECT sum(physical_units)
      FROM soro.inventory_group ig
      JOIN soro.product_group pg ON pg.inventory_group_id = ig.id AND pg.product_id = prd.id
    ),
    reserved_units = (
      SELECT sum(reserved_units)
      FROM soro.inventory_group ig
      JOIN soro.product_group pg ON pg.inventory_group_id = ig.id AND pg.product_id = prd.id
    ),
    available_units = (
      SELECT sum(available_units)
      FROM soro.inventory_group ig
      JOIN soro.product_group pg ON pg.inventory_group_id = ig.id AND pg.product_id = prd.id
    )
  WHERE seller_id = _seller.id;
  
  SELECT count(*) INTO _product_count FROM soro.product WHERE seller_id = _seller.id;

  SELECT _summary || jsonb_build_object('product_count', _product_count) INTO _summary;
  RETURN _summary;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.generate_seller_product_set(
  text
) TO soro_user;
`
