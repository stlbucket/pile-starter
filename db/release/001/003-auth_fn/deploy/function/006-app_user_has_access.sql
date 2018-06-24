-- Deploy auth_fn:function/app_user_has_access to pg
-- requires: function/current_app_user

BEGIN;

  CREATE function auth_fn.app_user_has_access(
    _app_tenant_id uuid
    ,_permission_key text DEFAULT ''
  ) returns boolean AS $$
  DECLARE
    _app_user auth.app_user;
    _retval boolean;
  BEGIN
    _app_user := (SELECT auth_fn.current_app_user());

--    RAISE EXCEPTION '
--      _app_user.app_tenant_id %
--      _app_tenant_id %
--    '
--    ,_app_user.app_tenant_id
--    ,_app_tenant_id
--    ;

    _retval := (_app_user.permission_key IN ('SuperAdmin')) OR (_app_user.app_tenant_id = _app_tenant_id);

    IF _permission_key = 'fail' THEN
      _retval := false;
    END IF;

    RETURN _retval;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.app_user_has_access(
    uuid
    ,text
  ) is 'Verify if a user has access to an entity via the app_tenant_id';
  --||--
  GRANT execute ON FUNCTION auth_fn.app_user_has_access(
    uuid
    ,text
  ) TO app_user;

COMMIT;
