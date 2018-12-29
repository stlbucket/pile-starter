-- Deploy app-jobs:003-structure/job to pg
-- requires: structure/002-job_queue

BEGIN;

  CREATE TABLE app_jobs.job (
    id serial PRIMARY KEY,
    queue_name varchar DEFAULT (public.gen_random_uuid())::varchar NOT NULL,
    task_identifier varchar NOT NULL,
    payload json DEFAULT '{}'::json NOT NULL,
    priority int DEFAULT 0 NOT NULL,
    run_at timestamp with time zone DEFAULT now() NOT NULL,
    attempts int DEFAULT 0 NOT NULL,
    last_error varchar,
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp with time zone NOT NULL DEFAULT NOW()
  );
  ALTER TABLE app_jobs.job_queue ENABLE ROW LEVEL SECURITY;

COMMIT;
