-- Deploy msg:structure/schema to pg
-- requires: org:0060-facility

BEGIN;

  CREATE SCHEMA msg;

  GRANT USAGE ON SCHEMA msg TO app_user, app_demon;

COMMIT;
