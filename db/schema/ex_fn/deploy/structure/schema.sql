-- Deploy ex_fn:structure/schema to pg
-- requires: :structure/schema

BEGIN;

  CREATE SCHEMA ex_fn;

  GRANT USAGE ON SCHEMA ex_fn TO app_user, app_demon;


COMMIT;
