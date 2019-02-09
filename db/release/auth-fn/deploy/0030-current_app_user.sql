BEGIN;

CREATE OR REPLACE FUNCTION auth_fn.current_app_user() returns auth.app_user as $$
  SELECT *
  FROM auth.app_user
  WHERE id = current_setting('jwt.claims.app_user_id')::bigint
$$ language sql stable security definer;
--||--
comment on function auth_fn.current_app_user() is E'@ omit';
--||--
GRANT execute ON FUNCTION auth_fn.current_app_user() TO app_user;

COMMIT;
