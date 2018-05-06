-- Revert app_jobs:structure/job_queue from pg

BEGIN;

  DROP TABLE IF EXISTS app_jobs.job_queue CASCADE;

COMMIT;
