-- Deploy app_jobs_fn:function/get_job to pg
-- requires: app-jobs:structure/job

BEGIN;

  CREATE FUNCTION app_jobs_fn.get_job(worker_id varchar, identifiers varchar[]) RETURNS app_jobs.job AS $$
  DECLARE
    v_job_id int;
    v_queue_name varchar;
    v_default_job_expiry text = (4 * 60 * 60)::text;
    v_default_job_maximum_attempts text = '25';
    v_row app_jobs.job;
  BEGIN
    IF worker_id IS NULL OR length(worker_id) < 10 THEN
      RAISE EXCEPTION 'Invalid worker ID';
    END IF;

    SELECT job_queue.queue_name, jobs.id INTO v_queue_name, v_job_id
      FROM app_jobs.job_queue
      INNER JOIN app_jobs.job USING (queue_name)
      WHERE (locked_at IS NULL OR locked_at < (now() - (COALESCE(current_setting('jobs.expiry', true), v_default_job_expiry) || ' seconds')::interval))
      AND run_at <= now()
      AND attempts < COALESCE(current_setting('jobs.maximum_attempts', true), v_default_job_maximum_attempts)::int
      AND (identifiers IS NULL OR task_identifier = any(identifiers))
      ORDER BY priority ASC, run_at ASC, id ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED;

    IF v_queue_name IS NULL THEN
      RETURN NULL;
    END IF;

    UPDATE app_jobs.job_queue
      SET
        locked_by = worker_id,
        locked_at = now()
      WHERE job_queue.queue_name = v_queue_name;

    UPDATE app_jobs.job
      SET attempts = attempts + 1
      WHERE id = v_job_id
      RETURNING * INTO v_row;

    RETURN v_row;
  END;
  $$ LANGUAGE plpgsql;

COMMIT;
