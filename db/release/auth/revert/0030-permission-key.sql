-- Revert auth:0030-permission-key from pg

BEGIN;

DROP TYPE IF EXISTS auth.permission_key CASCADE;

COMMIT;
