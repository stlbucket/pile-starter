-- Revert app-jobs:structure/job from pg

BEGIN;

  DROP TABLE IF EXISTS app_jobs.job CASCADE;

COMMIT;
