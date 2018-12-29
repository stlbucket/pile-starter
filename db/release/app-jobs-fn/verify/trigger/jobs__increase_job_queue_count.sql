-- Verify app_jobs_fn:trigger/jobs__increase_job_queue_count on pg

BEGIN;

select 1/count(*) from pg_trigger where tgname = '_500_increase_job_queue_count';

ROLLBACK;
