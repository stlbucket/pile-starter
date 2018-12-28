-- Revert org_fn:function/build_contact from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_facility(
    bigint
    ,text
    ,text
  );

COMMIT;
