-- Revert auth:structure/config from pg

BEGIN;

DROP TABLE IF EXISTS auth.config_auth CASCADE;

COMMIT;
