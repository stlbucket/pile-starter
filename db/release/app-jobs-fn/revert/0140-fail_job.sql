-- Revert app_jobs_fn:function/fail_job from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.fail_job(varchar, int, varchar);

COMMIT;
