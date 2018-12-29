-- Revert org-fn:function/build_organization_location from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_organization_location(
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
