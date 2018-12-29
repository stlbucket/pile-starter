-- Verify evt:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('msg', 'usage');

ROLLBACK;
