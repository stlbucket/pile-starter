-- Verify evt:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('evt', 'usage');

ROLLBACK;
