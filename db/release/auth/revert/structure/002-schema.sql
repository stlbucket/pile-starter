-- Revert auth:structure/schema from pg

BEGIN;

DROP SCHEMA auth CASCADE;

COMMIT;
