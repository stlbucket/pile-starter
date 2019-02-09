BEGIN;
  CREATE OR REPLACE function auth_fn.current_app_user_id() returns bigint AS $$
  DECLARE
  BEGIN
    return current_setting('jwt.claims.app_user_id')::bigint;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.current_app_user_id() is '@omit';
  --||--
  GRANT execute ON FUNCTION auth_fn.current_app_user_id() TO app_user;



 ALTER TABLE auth.app_user ENABLE ROW LEVEL SECURITY;
 --||--
 CREATE POLICY select_app_user_user ON auth.app_user FOR SELECT to app_user
  using (id = auth_fn.current_app_user_id());
 --||--
 CREATE POLICY select_app_user_admin ON auth.app_user FOR SELECT to app_admin
  using (app_tenant_id = auth_fn.current_app_tenant_id());
 --||--
 CREATE POLICY select_app_tenant_super_admin ON auth.app_user FOR SELECT to app_super_admin
  using (1=1);

COMMIT;
