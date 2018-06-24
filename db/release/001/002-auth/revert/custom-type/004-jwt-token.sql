-- Revert auth:custom-type/jwt-token from pg

BEGIN;

DROP TYPE IF EXISTS auth.jwt_token CASCADE;

COMMIT;
