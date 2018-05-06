-- Verify app_jobs_fn:function/complete_job on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.complete_job(varchar, int)', 'execute');

ROLLBACK;
