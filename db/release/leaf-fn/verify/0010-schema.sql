-- Verify leaf_fn:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('leaf_fn', 'usage');

ROLLBACK;
