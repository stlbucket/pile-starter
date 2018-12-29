-- Revert app_jobs_fn:do_notify from pg

BEGIN;

  DROP FUNCTION app_jobs_fn.do_notify();

COMMIT;
