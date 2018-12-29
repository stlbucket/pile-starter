-- Revert ex_fn:function/counter_up_evt from pg

BEGIN;

  DROP FUNCTION IF EXISTS ex_fn.counter_up_evt();
  DROP FUNCTION IF EXISTS ex_fn.consume_counter_up_evt(uuid);
  DROP FUNCTION IF EXISTS ex_fn.rollback_counter_up_evt(uuid);

COMMIT;
