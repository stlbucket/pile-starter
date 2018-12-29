-- Revert auth:0070-token from pg

BEGIN;

DROP TABLE IF EXISTS auth.token CASCADE;

COMMIT;
