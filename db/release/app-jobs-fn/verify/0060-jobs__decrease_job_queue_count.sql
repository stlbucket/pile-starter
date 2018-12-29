-- Verify app_jobs_fn:function/jobs__decrease_job_queue_count on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.jobs__decrease_job_queue_count()', 'execute');

  select 1/count(*) from pg_trigger where tgname = '_500_decrease_job_queue_count';

ROLLBACK;
