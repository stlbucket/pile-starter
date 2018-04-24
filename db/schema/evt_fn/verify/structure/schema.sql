-- Verify evt-fn:structure/schema on pg

BEGIN;

  SELECT pg_catalog.has_schema_privilege('evt_fn', 'usage');

ROLLBACK;
