-- Revert auth:custom-type/permission-key from pg

BEGIN;

DROP TYPE IF EXISTS auth.permission_key CASCADE;

COMMIT;
