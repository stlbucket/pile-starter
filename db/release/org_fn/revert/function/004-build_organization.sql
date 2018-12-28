-- Revert org_fn:function/build_organization from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_organization(
    text
    ,text
  );

COMMIT;
