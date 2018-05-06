-- Revert app_jobs_fn:function/complete_job from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.complete_job(varchar, int);

COMMIT;
