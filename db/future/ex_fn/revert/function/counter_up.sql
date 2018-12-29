-- Revert ex_fn:function/counter_up from pg

BEGIN;

  DROP FUNCTION IF EXISTS ex_fn.counter_up();

COMMIT;
