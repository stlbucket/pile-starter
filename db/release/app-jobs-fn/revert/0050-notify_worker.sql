-- Revert app_jobs_fn:trigger/notify_worker from pg

BEGIN;

  DROP TRIGGER IF EXISTS _900_notify_worker ON app_jobs.job CASCADE;

COMMIT;
