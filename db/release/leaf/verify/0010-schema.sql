-- Verify leaf:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('leaf', 'usage');

ROLLBACK;
