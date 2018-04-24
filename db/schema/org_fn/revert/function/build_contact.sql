-- Revert org:function/build_contact from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_contact(
    text
    ,text
    ,text
    ,uuid
  );

COMMIT;
