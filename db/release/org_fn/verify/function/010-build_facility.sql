-- Verify org_fn:function/build_facility on pg

BEGIN;

SELECT has_function_privilege('
  org_fn.build_facility(
    bigint
    ,text
    ,text
  )
', 'execute');

ROLLBACK;
