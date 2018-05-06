-- Deploy app_jobs_fn:function/fail_job to pg
-- requires: app_jobs:structure/job

BEGIN;

  CREATE FUNCTION app_jobs_fn.fail_job(worker_id varchar, job_id int, error_message varchar) RETURNS app_jobs.job AS $$
  DECLARE
    v_row app_jobs.job;
  BEGIN
    UPDATE app_jobs.job
      SET
        last_error = error_message,
        run_at = greatest(now(), run_at) + (exp(least(attempts, 10))::text || ' seconds')::interval
      WHERE id = job_id
      RETURNING * INTO v_row;

    UPDATE app_jobs.job_queue
      SET locked_by = null, locked_at = null
      WHERE queue_name = v_row.queue_name AND locked_by = worker_id;

    RETURN v_row;
  END;
  $$ LANGUAGE plpgsql;

COMMIT;
