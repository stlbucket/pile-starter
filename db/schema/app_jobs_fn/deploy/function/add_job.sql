-- Deploy app_jobs_fn:function/add_job to pg
-- requires: app_jobs:structure/job

BEGIN;

  CREATE FUNCTION app_jobs_fn.add_job(identifier varchar, payload json) RETURNS app_jobs.job AS $$
    INSERT INTO app_jobs.job(task_identifier, payload) VALUES(identifier, payload) RETURNING *;
  $$ LANGUAGE sql;

COMMIT;
