BEGIN;
  CREATE OR REPLACE function auth_fn.current_app_tenant_id() returns bigint AS $$
  DECLARE
  BEGIN
    return current_setting('jwt.claims.app_user_id')::bigint;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.current_app_tenant_id() is '@omit';
  --||--
  GRANT execute ON FUNCTION auth_fn.current_app_tenant_id() TO app_user;



 ALTER TABLE auth.app_tenant ENABLE ROW LEVEL SECURITY;
 --||--
 CREATE POLICY select_app_tenant_user ON auth.app_tenant FOR SELECT to app_user
  using (id = auth_fn.current_app_tenant_id());
 --||--
 CREATE POLICY select_app_tenant_super_admin ON auth.app_tenant FOR SELECT to app_super_admin
  using (1=1);


COMMIT;
