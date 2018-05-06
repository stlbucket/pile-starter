-- Verify app_jobs_fn:function/fail_job on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.fail_job(varchar, int, varchar)', 'execute');

ROLLBACK;
