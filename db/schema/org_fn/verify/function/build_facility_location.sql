-- Verify org-fn:function/build_facility_location on pg

BEGIN;

SELECT has_function_privilege('
    org_fn.build_facility_location(
      uuid
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
