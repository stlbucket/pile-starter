-- Revert app_jobs_fn:function/add_job from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.add_job(varchar, json);

COMMIT;
