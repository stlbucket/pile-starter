-- Deploy app_jobs_fn:trigger/update_timestamps to pg
-- requires: function/update_timestamps

BEGIN;

  CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_jobs.job FOR EACH ROW EXECUTE PROCEDURE app_jobs_fn.update_timestamps();

COMMIT;
