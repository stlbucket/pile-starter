-- Deploy org-fn:function/build_organization to pg
-- requires: structure/organization

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_tenant_organization(
    text
    ,text
    ,text
    ,text
    ,text
  );

COMMIT;
