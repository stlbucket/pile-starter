-- Deploy app_jobs_fn:trigger/jobs__increase_job_queue_count to pg
-- requires: function/jobs__increase_job_queue_count

BEGIN;

  CREATE TRIGGER _500_increase_job_queue_count AFTER INSERT ON app_jobs.job FOR EACH ROW EXECUTE PROCEDURE app_jobs_fn.jobs__increase_job_queue_count();

COMMIT;
