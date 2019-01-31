-- Revert app:seed-data from pg

BEGIN;

  DELETE FROM app.license;
  DELETE FROM app.license_type;
  DELETE FROM app.application;

COMMIT;
