-- Revert org:structure/schema from pg

BEGIN;

DROP SCHEMA org CASCADE;

COMMIT;
