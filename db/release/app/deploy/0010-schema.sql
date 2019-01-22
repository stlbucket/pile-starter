-- Deploy app:structure/schema to pg

BEGIN;

CREATE SCHEMA app;

GRANT USAGE ON SCHEMA app TO app_user;

COMMIT;
