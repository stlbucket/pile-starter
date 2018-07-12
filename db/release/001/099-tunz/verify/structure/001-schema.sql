-- Verify tunz:structure/schema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('tunz', 'usage');

ROLLBACK;
