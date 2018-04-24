-- Revert auth_fn:function/current_app_user from pg

BEGIN;

  DROP FUNCTION IF EXISTS auth_fn.current_app_user();

COMMIT;
