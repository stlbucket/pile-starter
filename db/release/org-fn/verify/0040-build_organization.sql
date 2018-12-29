-- Verify org-fn:function/build_organization on pg

BEGIN;

SELECT has_function_privilege('
  org_fn.build_organization(
  text
  ,text
  )
', 'execute');

ROLLBACK;
