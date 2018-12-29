-- Revert org-fn:function/build_facility_location from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_facility_location(
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
