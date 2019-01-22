-- Verify wf:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('wf', 'usage');

ROLLBACK;
