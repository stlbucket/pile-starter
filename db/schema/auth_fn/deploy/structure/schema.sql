-- Deploy auth_fn:structure/schema to pg
-- requires: structure/roles

BEGIN;

  CREATE SCHEMA auth_fn;
  
  GRANT usage ON SCHEMA auth_fn TO app_user, app_anonymous;
  
  ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

COMMIT;
