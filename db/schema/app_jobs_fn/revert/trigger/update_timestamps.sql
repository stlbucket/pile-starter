-- Revert app_jobs_fn:trigger/update_timestamps from pg

BEGIN;

  DROP TRIGGER IF EXISTS _100_timestamps ON app_jobs.job CASCADE;

COMMIT;
