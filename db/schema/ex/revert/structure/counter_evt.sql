-- Revert ex:structure/counter_evt from pg

BEGIN;

  DROP TABLE IF EXISTS ex.counter_evt;

COMMIT;
