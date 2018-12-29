-- Verify auth:structure/schema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('prj', 'usage');

ROLLBACK;
