-- Revert auth:0080-permission from pg

BEGIN;

  DROP TABLE IF EXISTS auth.permission CASCADE;

  DROP FUNCTION IF EXISTS auth.fn_timestamp_update_permission();
  
COMMIT;
