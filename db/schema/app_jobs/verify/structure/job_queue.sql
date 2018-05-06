-- Verify app_jobs:structure/job_queue on pg

BEGIN;

  SELECT
    queue_name,
    job_count,
    locked_at,
    locked_by
  FROM app_jobs.job_queue
  WHERE FALSE;

ROLLBACK;
