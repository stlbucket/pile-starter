-- Verify app_jobs_fn:function/update_timestamps on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.update_timestamps()', 'execute');

ROLLBACK;
