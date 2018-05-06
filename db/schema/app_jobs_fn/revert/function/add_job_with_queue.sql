-- Revert app_jobs_fn:function/add_job_with_queue from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.add_job(varchar, varchar, json);

COMMIT;
