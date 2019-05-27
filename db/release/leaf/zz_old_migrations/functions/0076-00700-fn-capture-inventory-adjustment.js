
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_inventory_adjustment(
  text,
  text,
  text,
  text,
  numeric,
  leaf.uom,
  leaf.lf_adjustment_reason,
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
CREATE OR REPLACE FUNCTION leaf.capture_lf_inventory_adjustment(
  _created_at text,
  _updated_at text,
  _external_id text,
  _adjusted_at text,
  _qty NUMERIC(20,4),
  _uom leaf.uom,
  _reason leaf.lf_adjustment_reason,
  _memo text,
  _deleted_at text,
  _global_id text,
  _global_mme_id text,
  _global_user_id text,
  _global_inventory_id text,
  _global_adjusted_by_user_id text
)
RETURNS leaf.lf_inventory_adjustment
as $$
DECLARE
  _seller_id uuid;
  _lf_inventory_adjustment leaf.lf_inventory_adjustment;
  _inventory_lot soro.inventory_lot;
  _import_result leaf.lf_import_result;
BEGIN
  _import_result := 'Imported';
  SELECT id
  INTO _seller_id
  FROM leaf.lf_seller_view
  WHERE global_mme_id = _global_mme_id;

  SELECT *
  INTO _inventory_lot
  FROM soro.inventory_lot
  WHERE external_id = _global_inventory_id;

  -- IF _inventory_lot.id IS NULL THEN
  --   RAISE EXCEPTION 'No inventory_lot for adjustment: %', _global_id;
  -- END IF;

  SELECT *
  INTO _lf_inventory_adjustment
  FROM leaf.lf_inventory_adjustment
  WHERE global_id = _global_id
  AND seller_id = _seller_id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _lf_inventory_adjustment.id IS NULL OR (_lf_inventory_adjustment.updated_at::timestamp < _updated_at::timestamp) THEN
    INSERT INTO leaf.lf_inventory_adjustment(
      created_at,
      updated_at,
      external_id,
      adjusted_at,
      qty,
      uom,
      reason,
      memo,
      deleted_at,
      global_id,
      global_mme_id,
      global_user_id,
      global_inventory_id,
      global_adjusted_by_user_id,
      inventory_lot_id,
      import_result,
      seller_id
    )
    SELECT
      CASE WHEN _created_at = '' THEN null::timestamp ELSE _created_at::timestamp END,
      CASE WHEN _updated_at = '' THEN null::timestamp ELSE _updated_at::timestamp END,
      _external_id,
      CASE WHEN _adjusted_at = '' THEN null::timestamp ELSE _adjusted_at::timestamp END,
      _qty,
      _uom,
      _reason,
      _memo,
      CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
      _global_id,
      _global_mme_id,
      _global_user_id,
      _global_inventory_id,
      _global_adjusted_by_user_id,
      null, -- _inventory_lot.id,
      _import_result,
      _seller_id
    RETURNING *
    INTO _lf_inventory_adjustment;
  END IF;

  RETURN _lf_inventory_adjustment;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_inventory_adjustment(
  text,
  text,
  text,
  text,
  numeric,
  leaf.uom,
  leaf.lf_adjustment_reason,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) TO soro_user;
`
