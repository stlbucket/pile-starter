-- Deploy app_jobs_fn:function/jobs__decrease_job_queue_count to pg
-- requires: structure/schema

BEGIN;

  CREATE FUNCTION app_jobs_fn.jobs__decrease_job_queue_count() RETURNS trigger AS $$
  BEGIN
    UPDATE app_jobs.job_queue
      SET job_count = job_queue.job_count - 1
      WHERE queue_name = OLD.queue_name
      AND job_queue.job_count > 1;

    IF NOT FOUND THEN
      DELETE FROM app_jobs.job_queue WHERE queue_name = OLD.queue_name;
    END IF;

    RETURN OLD;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER _500_decrease_job_queue_count BEFORE DELETE ON app_jobs.job FOR EACH ROW EXECUTE PROCEDURE app_jobs_fn.jobs__decrease_job_queue_count();

COMMIT;
