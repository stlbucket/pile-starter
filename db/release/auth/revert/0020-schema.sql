-- Revert auth:0020-schema from pg

BEGIN;

DROP SCHEMA auth CASCADE;

COMMIT;
