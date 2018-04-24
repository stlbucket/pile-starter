-- Deploy evt-fn:structure/schema to pg
-- requires: evt:structure/schema

BEGIN;

  CREATE SCHEMA evt_fn;

  GRANT USAGE ON SCHEMA evt_fn TO app_user, app_demon;

COMMIT;
