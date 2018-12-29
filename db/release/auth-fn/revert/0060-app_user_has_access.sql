-- Revert auth-fn:app_user_has_access from pg

BEGIN;

  DROP FUNCTION IF EXISTS auth_fn.app_user_has_access(
    bigint
    ,text
  )
  cascade;

COMMIT;
