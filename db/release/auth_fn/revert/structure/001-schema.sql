-- Revert auth_fn:structure/schema from pg

BEGIN;

DROP SCHEMA auth_fn CASCADE;

COMMIT;
