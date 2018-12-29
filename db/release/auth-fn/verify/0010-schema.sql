-- Verify auth-fn:schema on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('auth_fn', 'usage');

ROLLBACK;
