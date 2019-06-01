
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.generate_seller_each_weight_product_set(
  text
);
`
const upScript = `
CREATE OR REPLACE FUNCTION leaf.generate_seller_each_weight_product_set(
  _state_location_id text
)
RETURNS text
as $$
DECLARE
  _inventory_group soro.inventory_group;
  _inventory_type soro.inventory_type;
  _product soro.product;
  _strain soro.strain;
  _category_name text;
  _seller_view soro.seller_view;
BEGIN
  SELECT *
  INTO _seller_view
  FROM soro.seller_view
  WHERE state_location_id = _state_location_id;

  FOR _inventory_group IN
    SELECT *
    FROM soro.inventory_group ig
    WHERE seller_id = _seller_view.id
    AND NOT EXISTS (
      SELECT id
      FROM soro.product_group
      WHERE inventory_group_id = ig.id
    )
  LOOP
    SELECT *
    INTO _inventory_type
    FROM soro.inventory_type
    WHERE id = _inventory_group.inventory_type_id;

    SELECT *
    INTO _product
    FROM soro.product
    WHERE
      product_name = CASE
        WHEN position('product-has-strain' in _inventory_type.tags) > 0 THEN
          _inventory_group.name
        ELSE
          _inventory_group.base_product_name
        END
    AND seller_id = _seller_view.id
    ;

    IF _inventory_type.quote_method != 'None' THEN

      IF _product.id IS NULL THEN
        SELECT ic.name
        INTO _category_name
        FROM soro.inventory_type it
        JOIN soro.seller_inventory_type_category sitc ON it.id = sitc.inventory_type_id
        JOIN soro.inventory_category ic ON ic.id = sitc.inventory_category_id
        WHERE it.id = _inventory_type.id
        AND sitc.seller_id = _seller_view.id;

        INSERT INTO soro.product(
         seller_id,
         inventory_type_id,
         category_name,
         display_name,
         product_name,
         strain_id,
         unit_of_weight,
         quote_method
        )
        SELECT
        _seller_view.id,
        _inventory_type.id,
        _category_name,
        CASE WHEN position('product-has-strain' in _inventory_type.tags) > 0 THEN
          _inventory_group.name
        ELSE
          _inventory_group.base_product_name
        END display_name,
        CASE WHEN position('product-has-strain' in _inventory_type.tags) > 0 THEN
          _inventory_group.name
        ELSE
          _inventory_group.base_product_name
        END product_name,
        CASE WHEN position('product-has-strain' in _inventory_type.tags) > 0 THEN
          _inventory_group.strain_id
        ELSE
          NULL
        END strain_id,
        _inventory_type.unit_of_weight,
        _inventory_type.quote_method
        RETURNING *
        INTO _product
        ;
      END IF;

      UPDATE soro.product
      SET
        physical_units = physical_units + _inventory_group.physical_units,
        available_units = available_units + _inventory_group.available_units,
        reserved_units = reserved_units + _inventory_group.reserved_units
      WHERE id = _product.id
      ;

      INSERT INTO soro.product_group(
        product_id,
        inventory_group_id
      )
      SELECT
        _product.id,
        _inventory_group.id
      WHERE NOT EXISTS(
        SELECT id FROM soro.product_group WHERE product_id = _product.id AND inventory_group_id = _inventory_group.id
      )
      ;
    END IF;

  END LOOP;

  RETURN _seller_view.name;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.generate_seller_each_weight_product_set(
  text
) TO soro_user;
`
