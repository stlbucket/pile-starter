-- Deploy ex:structure/schema to pg
-- requires: app-roles:roles

BEGIN;

  CREATE SCHEMA ex;

  GRANT USAGE ON SCHEMA ex TO app_user, app_demon;

COMMIT;
