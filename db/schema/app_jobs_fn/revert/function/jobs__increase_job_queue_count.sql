-- Revert app_jobs_fn:function/jobs__increase_job_queue_count from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.jobs__increase_job_queue_count();

COMMIT;
