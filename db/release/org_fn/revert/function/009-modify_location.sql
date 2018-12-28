-- Revert org-fn:function/modify_location from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.modify_location(
    bigint
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
  );

COMMIT;
