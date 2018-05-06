-- Verify app_jobs_fn:function/add_job on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.add_job(varchar, json)', 'execute');

ROLLBACK;
