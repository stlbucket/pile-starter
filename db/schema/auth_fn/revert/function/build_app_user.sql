-- Revert auth_fn:function/build_app_user from pg

BEGIN;

  DROP FUNCTION IF EXISTS auth_fn.build_app_user(
    uuid,
    text,
    text,
    auth.permission_key
  );

COMMIT;
