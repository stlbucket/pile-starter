-- Revert evt:structure/schema from pg

BEGIN;

  DROP SCHEMA evt CASCADE;

COMMIT;
