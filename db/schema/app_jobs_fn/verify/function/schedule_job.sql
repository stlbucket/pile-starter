-- Verify app_jobs_fn:function/schedule_job on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.schedule_job(varchar, varchar, json, timestamptz)', 'execute');

ROLLBACK;
