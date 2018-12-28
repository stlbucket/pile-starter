-- Revert tunz:structure/schema from pg

BEGIN;

DROP SCHEMA tunz CASCADE;

COMMIT;
