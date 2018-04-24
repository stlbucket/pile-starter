-- Revert ex:structure/counter from pg

BEGIN;

  DROP TABLE IF EXISTS ex.counter;

COMMIT;
