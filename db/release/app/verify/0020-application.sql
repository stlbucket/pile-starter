-- Verify app:structure/application on pg

BEGIN;

SELECT
  id
  FROM app.application
 WHERE FALSE;

ROLLBACK;
