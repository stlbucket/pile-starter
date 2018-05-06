-- Revert app_jobs_fn:function/update_timestamps from pg

BEGIN;

  DROP FUNCTION IF EXISTS app_jobs_fn.update_timestamps();

COMMIT;
