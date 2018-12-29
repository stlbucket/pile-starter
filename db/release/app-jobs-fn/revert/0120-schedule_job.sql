-- Revert app_jobs_fn:function/schedule_job from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.schedule_job(varchar, varchar, json, timestamptz);

COMMIT;
