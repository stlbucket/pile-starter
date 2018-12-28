-- Revert org:structure/schema from pg

BEGIN;

DROP SCHEMA org_fn CASCADE;

COMMIT;
