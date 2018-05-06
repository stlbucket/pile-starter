-- Deploy app_jobs_fn:structure/schema to pg
-- requires: app_jobs:structure/schema

BEGIN;

  CREATE SCHEMA app_jobs_fn;

  GRANT usage ON SCHEMA app_jobs_fn TO app_user;

COMMIT;
