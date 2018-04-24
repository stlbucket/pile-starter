-- Verify org:function/build_facility on pg

BEGIN;

SELECT has_function_privilege('
  org_fn.build_facility(
    uuid
    ,text
    ,text
  )
', 'execute');

ROLLBACK;
