-- Revert app:seed-data from pg

BEGIN;

  DELETE FROM app.application CASCADE;

COMMIT;
