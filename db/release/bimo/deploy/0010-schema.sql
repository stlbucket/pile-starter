-- Deploy bimo:structure/schema to pg

BEGIN;

CREATE SCHEMA bimo;

GRANT USAGE ON SCHEMA bimo TO app_user;

COMMIT;
