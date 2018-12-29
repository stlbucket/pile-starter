-- Deploy app_jobs_fn:function/add_job_with_queue to pg
-- requires: app-jobs:structure/job

BEGIN;

  CREATE FUNCTION app_jobs_fn.add_job(identifier varchar, queue_name varchar, payload json) RETURNS app_jobs.job AS $$
    INSERT INTO app_jobs.job(task_identifier, queue_name, payload) VALUES(identifier, queue_name, payload) RETURNING *;
  $$ LANGUAGE sql;

COMMIT;
