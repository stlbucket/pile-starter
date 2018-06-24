-- Deploy org:structure/schema to pg

BEGIN;

CREATE SCHEMA org;

GRANT USAGE ON SCHEMA org TO app_user;

COMMIT;
