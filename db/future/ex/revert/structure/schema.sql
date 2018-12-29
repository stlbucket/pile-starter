-- Revert ex:structure/schema from pg

BEGIN;

  DROP SCHEMA ex CASCADE;

COMMIT;
