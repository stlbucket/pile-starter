-- Revert org-fn:function/build_contact_location from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_contact_location(
    bigint
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
  );

COMMIT;
