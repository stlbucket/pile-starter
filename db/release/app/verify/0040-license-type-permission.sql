-- Verify app:structure/license_type_permission on pg

BEGIN;

SELECT
  id
  FROM app.license_type_permission
 WHERE FALSE;

ROLLBACK;
