
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_area(
  text,
  text,
  text,
  text,
  text,
  text,
  leaf.lf_area_type,
  boolean,
  uuid
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.capture_lf_area(
  _global_id text,
  _created_at text,
  _updated_at text,
  _external_id text,
  _name text,
  _deleted_at text,
  _type leaf.lf_area_type,
  _is_quarantine_area boolean,
  _seller_id uuid
)
RETURNS leaf.lf_area
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _room soro.room;
  _import_result leaf.lf_import_result;
  _import_message text;
  _lf_area leaf.lf_area;
BEGIN
  _import_result := 'Processed';

  SELECT *
  INTO _seller
  FROM leaf.lf_seller_view
  WHERE id = _seller_id;

--  RAISE EXCEPTION 'HEY NOW';

  SELECT *
  INTO _room
  FROM soro.room
  WHERE external_id = _global_id
  AND seller_id = _seller.id;

  IF _room.id IS NULL AND _deleted_at = '' THEN
    INSERT INTO soro.room(
      name,
      seller_id,
      external_id,
      room_type,
      quarantine,
      location_id,
      deleted
    )
    SELECT
      _name,
      _seller.id,
      _global_id,
      'Inventory',
      CASE WHEN _type = 'quarantine' THEN true ELSE false END,
      _seller.location_id,
      CASE WHEN _deleted_at = '' THEN false ELSE true END
    RETURNING *
    INTO _room;
  ELSE
    UPDATE soro.room
    SET
      name = _name,
      quarantine = CASE WHEN _type = 'quarantine' THEN true ELSE false END,
      deleted = CASE WHEN _deleted_at = '' THEN false ELSE true END
    WHERE id = _room.id;
  END IF;

  SELECT *
  INTO _lf_area
  FROM leaf.lf_area
  WHERE global_id = _global_id
  AND seller_id = _seller_id
  ORDER BY updated_at DESC
  LIMIT 1;

  IF _lf_area.id IS NULL OR (_lf_area.updated_at::timestamp < _updated_at::timestamp) THEN
    INSERT INTO leaf.lf_area(
      room_id,
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
      _room.id,
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
    INTO _lf_area;
  END IF;

  RETURN _lf_area;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_area(
  text,
  text,
  text,
  text,
  text,
  text,
  leaf.lf_area_type,
  boolean,
  uuid
) TO soro_user;
`
