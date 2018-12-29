-- Revert app-jobs:structure/schema from pg

BEGIN;

  DROP SCHEMA IF EXISTS app_jobs CASCADE;
  
COMMIT;
