BEGIN;

  DROP FUNCTION IF EXISTS auth_fn.authenticate(
    text
    ,text
  );

COMMIT;
