-- Verify org-fn:function/build_organization_location on pg

BEGIN;

SELECT has_function_privilege('
    org_fn.build_organization_location(
      bigint
      ,text
      ,text
      ,text
      ,text
      ,text
      ,text
      ,text
      ,text
    )
  ', 'execute');

ROLLBACK;
