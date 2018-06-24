-- Revert auth:structure/permission from pg

BEGIN;

  DROP TABLE IF EXISTS auth.permission CASCADE;

COMMIT;
