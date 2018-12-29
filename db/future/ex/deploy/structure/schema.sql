-- Deploy ex:structure/schema to pg
-- requires: :structure/schema

BEGIN;

  CREATE SCHEMA ex;

  GRANT USAGE ON SCHEMA ex TO app_user, app_demon;


COMMIT;
