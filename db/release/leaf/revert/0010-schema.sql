-- Revert leaf:structure/schema from pg

BEGIN;

  DROP SCHEMA leaf CASCADE;

COMMIT;
