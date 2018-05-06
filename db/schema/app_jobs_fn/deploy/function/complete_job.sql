-- Deploy app_jobs_fn:function/complete_job to pg
-- requires: app_jobs:structure/job

BEGIN;

  CREATE FUNCTION app_jobs_fn.complete_job(worker_id varchar, job_id int) RETURNS app_jobs.job AS $$
  DECLARE
    v_row app_jobs.job;
  BEGIN
    DELETE FROM app_jobs.job
      WHERE id = job_id
      RETURNING * INTO v_row;

    UPDATE app_jobs.job_queue
      SET locked_by = null, locked_at = null
      WHERE queue_name = v_row.queue_name AND locked_by = worker_id;

    RETURN v_row;
  END;
  $$ LANGUAGE plpgsql;

COMMIT;
