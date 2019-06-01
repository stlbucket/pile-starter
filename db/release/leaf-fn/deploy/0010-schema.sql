-- Deploy leaf_fn:structure/schema to pg
-- requires: app-roles:roles

BEGIN;

  CREATE SCHEMA leaf_fn;

  GRANT USAGE ON SCHEMA leaf_fn TO app_demon;

COMMIT;
