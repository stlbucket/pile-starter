-- Verify bimo:structure/schema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('bimo', 'usage');

ROLLBACK;
