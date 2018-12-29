-- Deploy prj:structure/0010-schema to pg
-- requires: auth:structure/0010-schema

BEGIN;

  CREATE SCHEMA prj;
  
  GRANT usage ON SCHEMA prj TO app_super_admin, app_anonymous;
  
  ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

COMMIT;
