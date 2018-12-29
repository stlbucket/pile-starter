-- Verify org-fn:function/build_location on pg

BEGIN;

  SELECT has_function_privilege('
    org_fn.build_location(
      text
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
