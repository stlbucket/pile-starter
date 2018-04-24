-- Verify ex_fn:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('ex_fn', 'usage');

ROLLBACK;
