-- Verify org:structure/schema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('org', 'usage');

ROLLBACK;
