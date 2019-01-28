-- Deploy auth:0020-schema to pg
-- requires: app-roles:0010-roles

BEGIN;

  CREATE SCHEMA auth;
  
  GRANT usage ON SCHEMA auth TO app_user, app_anonymous;
  
  ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

COMMIT;
