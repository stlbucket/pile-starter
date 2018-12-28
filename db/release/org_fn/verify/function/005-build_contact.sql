-- Verify org_fn:function/build_contact on pg

BEGIN;

SELECT has_function_privilege('
  org_fn.build_contact(
    text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,bigint
  )
', 'execute');

ROLLBACK;
