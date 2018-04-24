-- Revert org:function/build_contact from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_contact(
    uuid
    ,text
    ,text
  );

COMMIT;
