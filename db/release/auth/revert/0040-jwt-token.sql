-- Revert auth:0040-jwt-token from pg

BEGIN;

DROP TYPE IF EXISTS auth.jwt_token CASCADE;

COMMIT;
