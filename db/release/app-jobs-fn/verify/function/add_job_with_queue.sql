-- Verify app_jobs_fn:function/add_job_with_queue on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.add_job(varchar, varchar, json)', 'execute');

ROLLBACK;
