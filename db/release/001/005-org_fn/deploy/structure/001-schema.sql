-- Deploy org:structure/schema to pg

BEGIN;

CREATE SCHEMA org_fn;

GRANT USAGE ON SCHEMA org_fn TO app_user;

COMMIT;
