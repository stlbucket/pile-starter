-- Verify app:structure/license_permission on pg

BEGIN;

SELECT
  id
  FROM app.license_permission
 WHERE FALSE;

ROLLBACK;
