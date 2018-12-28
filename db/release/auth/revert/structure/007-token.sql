-- Revert auth:structure/token from pg

BEGIN;

DROP TABLE IF EXISTS auth.token CASCADE;

COMMIT;
