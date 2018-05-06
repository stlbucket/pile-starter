-- Deploy app_jobs_fn:trigger/jobs__decrease_job_queue_count to pg
-- requires: function/jobs__decrease_job_queue_count

BEGIN;

  CREATE TRIGGER _500_decrease_job_queue_count BEFORE DELETE ON app_jobs.job FOR EACH ROW EXECUTE PROCEDURE app_jobs_fn.jobs__decrease_job_queue_count();

COMMIT;
