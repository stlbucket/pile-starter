-- Verify org-fn:function/build_contact_location on pg

BEGIN;

SELECT has_function_privilege('
    org_fn.build_contact_location(
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
