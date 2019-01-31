-- Revert app:seed-data from pg

BEGIN;

  DELETE FROM prj.project CASCADE;

COMMIT;
