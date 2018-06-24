-- Deploy auth_fn:function/current_app_user to pg
-- requires: structure/app_user
-- requires: custom-type/jwt-token

BEGIN;

CREATE OR REPLACE FUNCTION auth_fn.current_app_user() returns auth.app_user as $$
  SELECT *
  FROM auth.app_user
  WHERE id = current_setting('jwt.claims.app_user_id')::uuid
$$ language sql stable;
--||--
comment on function auth_fn.current_app_user() is 'Gets the user who was identified by our JWT.  This function is meant for use only on server';
--||--
--GRANT execute ON FUNCTION auth_fn.current_app_user() TO soro_user;

COMMIT;
