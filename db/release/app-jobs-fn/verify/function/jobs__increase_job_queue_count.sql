-- Verify app_jobs_fn:function/jobs__increase_job_queue_count on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.jobs__increase_job_queue_count()', 'execute');

ROLLBACK;
