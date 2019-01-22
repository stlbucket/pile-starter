-- Verify app:structure/license on pg

BEGIN;

SELECT
  id
  FROM app.license
 WHERE FALSE;

ROLLBACK;
