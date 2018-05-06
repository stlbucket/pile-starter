-- Revert app_jobs_fn:trigger/jobs__decrease_job_queue_count from pg

BEGIN;

  DROP TRIGGER IF EXISTS _500_decrease_job_queue_count ON app_jobs.job CASCADE;

COMMIT;
