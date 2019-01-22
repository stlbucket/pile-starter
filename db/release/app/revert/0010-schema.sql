-- Revert app:structure/schema from pg

BEGIN;

DROP SCHEMA app CASCADE;

COMMIT;
