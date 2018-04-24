-- Verify ex:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('ex', 'usage');

ROLLBACK;
