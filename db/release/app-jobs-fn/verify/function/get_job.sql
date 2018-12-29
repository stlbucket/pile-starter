-- Verify app_jobs_fn:function/get_job on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.get_job(varchar, varchar[])', 'execute');

ROLLBACK;
