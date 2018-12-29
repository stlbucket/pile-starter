-- Revert auth:0090-config-auth from pg

BEGIN;

DROP TABLE IF EXISTS auth.config_auth CASCADE;

COMMIT;
