-- Verify app_jobs_fn:trigger/notify_worker on pg

BEGIN;

select 1/count(*) from pg_trigger where tgname = '_900_notify_worker';

ROLLBACK;
