-- Verify app:structure/license_type on pg

BEGIN;

SELECT
  id
  FROM app.license_type
 WHERE FALSE;

ROLLBACK;
