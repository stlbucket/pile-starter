BEGIN;

  CREATE OR REPLACE function auth_fn.app_user_has_access(
    _app_tenant_id bigint
    ,_permission_key text DEFAULT ''
  ) returns boolean AS $$
  DECLARE
    _app_user auth.app_user;
    _retval boolean;
  BEGIN
    _app_user := (SELECT auth_fn.current_app_user());

  --  RAISE EXCEPTION '
  --    _app_user.app_tenant_id %
  --    _app_tenant_id %
  --    _jwt.claims.app_user_id %
  --  '
  --  ,_app_user
  --  ,_app_tenant_id
  --  ,current_setting('jwt.claims.app_user_id')
  --  ;
  
    _retval := (_app_user.permission_key IN ('SuperAdmin')) OR (_app_user.app_tenant_id = _app_tenant_id);

    IF _permission_key = 'fail' THEN
      _retval := false;
    END IF;

    RETURN _retval;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.app_user_has_access(
    bigint
    ,text
  ) is 'Verify if a user has access to an entity via the app_tenant_id';
  --||--
  GRANT execute ON FUNCTION auth_fn.app_user_has_access(
    bigint
    ,text
  ) TO app_user;



 ALTER TABLE auth.app_tenant ENABLE ROW LEVEL SECURITY;
 --||--
 CREATE POLICY select_app_tenant ON auth.app_tenant FOR SELECT
  using (auth_fn.app_user_has_access(id) = true);

COMMIT;
