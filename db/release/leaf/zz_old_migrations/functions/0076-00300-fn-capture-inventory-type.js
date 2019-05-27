
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_inventory_type(
  text,
  text,
  text,
  text,
  leaf.lf_product_stage,
  leaf.uom,
  text,
  leaf.intermediate_type,
  text,
  text,
  text
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.capture_lf_inventory_type(
  _created_at text,
  _updated_at text,
  _external_id text,
  _name text,
  _type leaf.lf_product_stage,
  _uom leaf.uom,
  _deleted_at text,
  _intermediate_type leaf.intermediate_type,
  _global_id text,
  _global_mme_id text,
  _global_user_id text
)
RETURNS leaf.lf_inventory_type
as $$
DECLARE
  _seller_id uuid;
  _soro_inventory_type soro.inventory_type;
  _product soro.product;
  _category_name text;
  _lf_inventory_type leaf.lf_inventory_type;
  _import_result leaf.lf_import_result;
BEGIN
  _import_result := 'Imported';
  
  SELECT id
  INTO _seller_id
  FROM leaf.lf_seller_view
  WHERE global_mme_id = _global_mme_id;

  SELECT *
  INTO _soro_inventory_type
  FROM soro.inventory_type
  WHERE id = (
    SELECT soro_inventory_type_id
    from leaf.inventory_type_rule
    WHERE intermediate_type = _intermediate_type
  );

  IF _soro_inventory_type.id IS NULL THEN
    RAISE EXCEPTION 'NO SORO INVENTORY TYPE FOR INTERMEDIATE TYPE: %', _intermediate_type::text;
  END IF;

  -- SELECT *
  -- INTO _inventory_group
  -- FROM soro.inventory_group
  -- WHERE display_name = _name
  -- AND seller_id = _seller_id;
  --
  -- IF _inventory_group.id IS NULL THEN
  --   SELECT ic.name
  --   INTO _category_name
  --   FROM soro.inventory_type it
  --   JOIN soro.seller_inventory_type_category sitc ON it.id = sitc.inventory_type_id
  --   JOIN soro.inventory_category ic ON ic.id = sitc.inventory_category_id
  --   WHERE it.id = _soro_inventory_type.id
  --   AND sitc.seller_id = _seller_id;
  --
  --   INSERT INTO soro.inventory_group(
  --     seller_id,
  --     inventory_type_id,
  --     strain_id,
  --     name
  --   )
  --   SELECT
  --     _seller_id,
  --     _soro_inventory_type.id,
  --     _strain_id,
  --     _name
  --   RETURNING *
  --   INTO _inventory_group;
  -- END IF; 

  SELECT *
  INTO _lf_inventory_type
  FROM leaf.lf_inventory_type
  WHERE global_id = _global_id
  AND seller_id = _seller_id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _lf_inventory_type.id IS NULL OR (_lf_inventory_type.updated_at::timestamp < _updated_at::timestamp) THEN
    INSERT INTO leaf.lf_inventory_type(
      created_at,
      updated_at,
      external_id,
      name,
      product_stage,
      uom,
      deleted_at,
      intermediate_type,
      global_id,
      global_mme_id,
      global_user_id,
      inventory_type_id,
--      inventory_group_id,
      import_result,
      seller_id
    )
    SELECT
      _created_at,
      _updated_at,
      _external_id,
      _name,
      _type,
      _uom,
      _deleted_at,
      _intermediate_type,
      _global_id,
      _global_mme_id,
      _global_user_id,
      _soro_inventory_type.id,
--      _inventory_group.id,
      _import_result,
      _seller_id
    RETURNING *
    INTO _lf_inventory_type;
  END IF;

--  RAISE NOTICE '_seller_id: %', _seller_id;
--  RAISE NOTICE '_soro_inventory_type: %', _soro_inventory_type;
--  RAISE NOTICE '_product: %', _product;
--  RAISE EXCEPTION '_lf_inventory_type: %', _lf_inventory_type;

  RETURN _lf_inventory_type;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_inventory_type(
  text,
  text,
  text,
  text,
  leaf.lf_product_stage,
  leaf.uom,
  text,
  leaf.intermediate_type,
  text,
  text,
  text
) TO soro_user;
`
