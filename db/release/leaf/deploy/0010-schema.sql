-- Deploy leaf:structure/schema to pg
-- requires: app-roles:roles

BEGIN;

  CREATE SCHEMA leaf;

  GRANT USAGE ON SCHEMA leaf TO app_user, app_demon;

COMMIT;
