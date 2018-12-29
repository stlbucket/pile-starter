-- Verify app_jobs_fn:do_notify on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.do_notify()', 'execute');

ROLLBACK;
