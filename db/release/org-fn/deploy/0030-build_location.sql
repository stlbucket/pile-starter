-- Deploy org-fn:function/build_location to pg
-- requires: structure/location

BEGIN;

create or replace function org_fn.build_location(
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

  INSERT INTO org.location(
    name
    ,address1
    ,address2
    ,city
    ,state
    ,zip
    ,lat
    ,lon
    ,app_tenant_id
  )
  SELECT
    _name
    ,_address1
    ,_address2
    ,_city
    ,_state
    ,_zip
    ,_lat
    ,_lon
    ,_app_user.app_tenant_id

  RETURNING *
  INTO _location
  ;

  RETURN _location;

end;
$$ language plpgsql strict security definer;

--GRANT EXECUTE ON FUNCTION org_fn.build_location(
--  text
--  ,text
--  ,text
--  ,text
--  ,text
--  ,text
--  ,text
--  ,text
--) TO app_user;

COMMIT;
