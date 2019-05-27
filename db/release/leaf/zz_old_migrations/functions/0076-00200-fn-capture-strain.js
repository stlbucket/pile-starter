
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_strain(
  text,
  text,
  text,
  text,
  text,
  text,
  uuid
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.capture_lf_strain(
  _name text,
  _global_id text,
  _external_id text,
  _created_at text,
  _updated_at text,
  _deleted_at text,
  _seller_id uuid
)
RETURNS leaf.lf_strain
as $$
DECLARE
  _strain soro.strain;
  _import_result leaf.lf_import_result;
  _lf_strain leaf.lf_strain;
BEGIN
  _import_result := 'Imported';

--  RAISE EXCEPTION 'HEY NOW';

  SELECT *
  INTO _strain
  FROM soro.strain
  WHERE name = _name
  AND seller_id = _seller_id;

  IF _strain.id IS NULL AND _deleted_at = '' THEN
    INSERT INTO soro.strain(
      name,
      seller_id,
      external_id
    )
    SELECT
      _name,
      _seller_id,
      _global_id
    RETURNING *
    INTO _strain;
  END IF;

  SELECT *
  INTO _lf_strain
  FROM leaf.lf_strain
  WHERE global_id = _global_id
  AND seller_id = _seller_id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _lf_strain.id IS NULL OR (_lf_strain.updated_at::timestamp < _updated_at::timestamp) THEN
    INSERT INTO leaf.lf_strain(
      strain_id,
      seller_id,
      created_at,
      updated_at,
      external_id,
      name,
      global_id,
      deleted_at,
      import_result,
      import_message
    )
    SELECT
      _strain.id,
      _seller_id,
      CASE WHEN _created_at = '' THEN null::timestamp ELSE _created_at::timestamp END,
      CASE WHEN _updated_at = '' THEN null::timestamp ELSE _updated_at::timestamp END,
      _external_id,
      _name,
      _global_id,
      CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
      _import_result,
      ''
    RETURNING *
    INTO _lf_strain;
  END IF;

  RETURN _lf_strain;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_strain(
  text,
  text,
  text,
  text,
  text,
  text,
  uuid
) TO soro_user;
`
