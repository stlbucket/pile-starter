-- Revert bimo:structure/schema from pg

BEGIN;

DROP SCHEMA bimo CASCADE;

COMMIT;
