-- Revert app_jobs_fn:function/get_job from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.get_job(varchar, varchar[]);

COMMIT;
