-- Deploy evt:structure/schema to pg
-- requires: app-roles:roles

BEGIN;

  CREATE SCHEMA evt;

  GRANT USAGE ON SCHEMA evt TO app_user, app_demon;

COMMIT;
