-- Revert org:function/build_location from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.build_location(
    text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,uuid
  );

COMMIT;
