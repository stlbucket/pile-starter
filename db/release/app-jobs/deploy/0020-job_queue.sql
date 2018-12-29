-- Deploy app-jobs:structure/job_queue to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app_jobs.job_queue (
    queue_name varchar NOT NULL PRIMARY KEY,
    job_count int DEFAULT 0 NOT NULL,
    locked_at timestamp with time zone,
    locked_by varchar
  );
  ALTER TABLE app_jobs.job_queue ENABLE ROW LEVEL SECURITY;


COMMIT;
