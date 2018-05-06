-- Verify app_jobs:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('app_jobs', 'usage');

ROLLBACK;
