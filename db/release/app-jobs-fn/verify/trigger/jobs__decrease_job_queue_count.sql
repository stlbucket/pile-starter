-- Verify app_jobs_fn:trigger/jobs__decrease_job_queue_count on pg

BEGIN;

select 1/count(*) from pg_trigger where tgname = '_500_decrease_job_queue_count';

ROLLBACK;
