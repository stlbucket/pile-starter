-- Verify app_jobs:structure/job on pg

BEGIN;

  SELECT
    id,
    queue_name,
    task_identifier,
    payload,
    priority,
    run_at,
    attempts,
    last_error,
    created_at,
    updated_at
  FROM app_jobs.job
  WHERE FALSE;

ROLLBACK;
