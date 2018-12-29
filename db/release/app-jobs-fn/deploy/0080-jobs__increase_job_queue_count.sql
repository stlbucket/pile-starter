-- Deploy app_jobs_fn:function/jobs__increase_job_queue_count to pg
-- requires: structure/schema

BEGIN;

  CREATE FUNCTION app_jobs_fn.jobs__increase_job_queue_count() RETURNS trigger AS $$
  BEGIN
    INSERT INTO app_jobs.job_queue(queue_name, job_count)
      VALUES(NEW.queue_name, 1)
      ON CONFLICT (queue_name) DO UPDATE SET job_count = job_queue.job_count + 1;

    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER _500_increase_job_queue_count AFTER INSERT ON app_jobs.job FOR EACH ROW EXECUTE PROCEDURE app_jobs_fn.jobs__increase_job_queue_count();

COMMIT;
