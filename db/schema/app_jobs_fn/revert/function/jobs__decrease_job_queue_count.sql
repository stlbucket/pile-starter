-- Revert app_jobs_fn:function/jobs__decrease_job_queue_count from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.jobs__decrease_job_queue_count();

COMMIT;
