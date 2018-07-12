-- Deploy tunz:structure/schema to pg

BEGIN;

CREATE SCHEMA tunz;

GRANT USAGE ON SCHEMA tunz TO app_user;

COMMIT;
