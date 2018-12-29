-- Verify app_jobs_fn:trigger/update_timestamps on pg

BEGIN;

  select 1/count(*) from pg_trigger where tgname = '_100_timestamps';

ROLLBACK;
