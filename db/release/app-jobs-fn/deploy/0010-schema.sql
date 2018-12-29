-- Deploy app_jobs_fn:structure/0010-schema to pg
-- requires: app-jobs:structure/0010-schema

BEGIN;

  CREATE SCHEMA app_jobs_fn;

  GRANT usage ON SCHEMA app_jobs_fn TO app_user;

COMMIT;
