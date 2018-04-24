-- Revert auth_fn:function/authenticate from pg

BEGIN;

  DROP FUNCTION IF EXISTS auth_fn.authenticate(
    text
    ,text
  );

COMMIT;
