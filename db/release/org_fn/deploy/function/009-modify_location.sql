-- Deploy org_fn:function/modify_location to pg
-- requires: structure/location

BEGIN;

create function org_fn.modify_location(
  _id bigint,
  _name text,
  _address1 text,
  _address2 text,
  _city text,
  _state text,
  _zip text,
  _lat text,
  _lon text
)
returns org.location as $$
declare
  _app_user auth.app_user;
  _location org.location;
begin
  _app_user := (SELECT auth_fn.current_app_user());

  SELECT *
  INTO _location
  FROM org.location
  WHERE id = _id
  AND auth_fn.app_user_has_access(app_tenant_id)
  ;

  IF _location.id IS NULL THEN
    RAISE EXCEPTION 'No location for id: %', _id;
  END IF;

  UPDATE org.location
  SET
    name = _name
    ,address1 = _address1
    ,address2 = _address2
    ,city = _city
    ,state = _state
    ,zip = _zip
    ,lat = _lat
    ,lon = _lon
  WHERE id = _location.id
  RETURNING *
  INTO _location
  ;

  RETURN _location;

end;
$$ language plpgsql strict security definer;

GRANT EXECUTE ON FUNCTION org_fn.modify_location(
  bigint
  ,text
  ,text
  ,text
  ,text
  ,text
  ,text
  ,text
  ,text
) TO app_user;

COMMIT;
