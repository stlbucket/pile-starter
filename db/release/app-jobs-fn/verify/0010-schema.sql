-- Verify app_jobs_fn:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('app_jobs_fn', 'usage');

ROLLBACK;
