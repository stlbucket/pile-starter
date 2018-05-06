-- Revert app_jobs_fn:structure/schema from pg

BEGIN;

  DROP SCHEMA IF EXISTS app_jobs_fn CASCADE;

COMMIT;
