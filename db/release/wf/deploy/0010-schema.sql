-- Deploy wf:structure/schema to pg
-- requires: app-roles:roles

BEGIN;

  CREATE SCHEMA wf;

  GRANT USAGE ON SCHEMA wf TO app_user, app_demon;

COMMIT;
