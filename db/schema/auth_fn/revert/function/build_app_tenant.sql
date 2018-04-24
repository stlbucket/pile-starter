-- Revert auth_fn:function/build_app_tenant from pg

BEGIN;

  DROP FUNCTION IF EXISTS auth_fn.build_app_tenant(
    text
    ,text
  );

COMMIT;
