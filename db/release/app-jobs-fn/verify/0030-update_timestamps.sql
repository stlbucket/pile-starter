-- Verify app_jobs_fn:function/update_timestamps on pg

BEGIN;

  SELECT has_function_privilege('app_jobs_fn.update_timestamps()', 'execute');

  select 1/count(*) from pg_trigger where tgname = '_100_timestamps';

ROLLBACK;
