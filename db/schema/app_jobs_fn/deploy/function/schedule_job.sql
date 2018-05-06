-- Deploy app_jobs_fn:function/schedule_job to pg
-- requires: app_jobs:structure/job

BEGIN;

  CREATE FUNCTION app_jobs_fn.schedule_job(identifier varchar, queue_name varchar, payload json, run_at timestamptz) RETURNS app_jobs.job AS $$
    INSERT INTO app_jobs.job(task_identifier, queue_name, payload, run_at) VALUES(identifier, queue_name, payload, run_at) RETURNING *;
  $$ LANGUAGE sql;

COMMIT;
