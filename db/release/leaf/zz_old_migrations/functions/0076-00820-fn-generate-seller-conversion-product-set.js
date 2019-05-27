
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.generate_seller_conversion_product_set(
  text
);
`
const upScript = `
CREATE OR REPLACE FUNCTION leaf.generate_seller_conversion_product_set(
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
  _conversion_definition soro.conversion_definition;
  _conversion_source_definition soro.conversion_source_definition;
  _conversion_target_definition soro.conversion_target_definition;
BEGIN
  SELECT *
  INTO _seller_view
  FROM soro.seller_view
  WHERE state_location_id = _state_location_id;

  FOR _conversion_definition IN
    SELECT *
    FROM soro.conversion_definition cd
    WHERE context = 'Quote'
    AND scope = 'Strain'
  LOOP
    -- get conversion definition inventory type
    SELECT *
    INTO _inventory_type
    FROM soro.inventory_type
    WHERE id = _conversion_definition.inventory_type_id;

    FOR _inventory_group IN
      SELECT sig.*
      FROM soro.conversion_source_definition csd
      JOIN soro.inventory_group sig
        ON sig.inventory_type_id = csd.inventory_type_id
        AND sig.seller_id = _seller_view.id
      WHERE csd.conversion_definition_id = _conversion_definition.id
      order by sig.strain_id
    LOOP
    -- for each source inventory group

      -- get strain
      SELECT *
      INTO _strain
      FROM soro.strain
      WHERE id = _inventory_group.strain_id;

      -- look for product
      SELECT *
      INTO _product
      FROM soro.product
      WHERE seller_id = _seller_view.id
      AND inventory_type_id = _conversion_definition.inventory_type_id
      AND strain_id = _strain.id
      ;

      IF _product.id IS NULL THEN
        -- create product if it doesn't exist

        -- lookup the category name
        SELECT ic.name
        INTO _category_name
        FROM soro.inventory_type it
        JOIN soro.seller_inventory_type_category sitc ON it.id = sitc.inventory_type_id
        JOIN soro.inventory_category ic ON ic.id = sitc.inventory_category_id
        WHERE it.id = _inventory_type.id
        AND sitc.seller_id = _seller_view.id;

        -- do the insert
        INSERT INTO soro.product(
          seller_id,
          inventory_type_id,
          strain_id,
          product_name,
          category_name,
          display_name,
          unit_of_weight,
          quote_method
       )
        SELECT
          _seller_view.id,
          _conversion_definition.inventory_type_id,
          _strain.id,
          _conversion_definition.name || ' - ' || _strain.name,
          _category_name,
          _strain.name,
          _inventory_type.unit_of_weight,
          _inventory_type.quote_method
        RETURNING *
        INTO _product
        ;

        -- fix up allowed licenses
        UPDATE soro.product prd
        SET allowed_customer_license_types = license_agg.allowed_license_types
        FROM (
          SELECT soro.array_sort_unique(array_agg(itr.target_license_type)) allowed_license_types, it.id inventory_type_id
          FROM soro.inventory_transfer_rule itr
          JOIN soro.inventory_type it ON itr.inventory_type_id = it.id
          JOIN soro.seller s ON s.id = _product.seller_id
          JOIN soro.company c ON c.id = s.company_id
            AND itr.source_license_type = ANY (c.licenses)
            AND itr.transfer_rule = 'Allow'
          WHERE it.id = _product.inventory_type_id
          GROUP BY
            it.id
        ) license_agg
        WHERE prd.id = _product.id;
      END IF;

      -- associate group to product
      INSERT INTO soro.product_group(
        product_id,
        inventory_group_id
      )
      SELECT
        _product.id,
        _inventory_group.id
      WHERE NOT EXISTS (
        SELECT id FROM soro.product_group WHERE product_id = _product.id and inventory_group_id = _inventory_group.id
      );

      -- update product inventory levels
      -- UPDATE soro.product
      -- SET
      --   physical_units = (SELECT sum(physical_units) FROM soro.inventory_group WHERE ),
      --   physical_units = physical_units + _inventory_group.physical_units,
      --   available_units = available_units + _inventory_group.available_units,
      --   reserved_units = reserved_units + _inventory_group.reserved_units
      -- WHERE id = _product.id;

--      RAISE NOTICE 'strain: %  ----  name: % ---- inv_type: %'
--          , _strain.name
--          , _inventory_group.name
--          , _inventory_type.name
--          ;
--
--      RAISE EXCEPTION 'product: %', _product;
    END LOOP;
  END LOOP;

  RETURN _seller_view.name;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.generate_seller_conversion_product_set(
  text
) TO soro_user;
`
