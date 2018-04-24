-- Verify ex_fn:function/counter_up_evt on pg

BEGIN;

  SELECT has_function_privilege('ex_fn.counter_up_evt()', 'execute');
  SELECT has_function_privilege('ex_fn.consume_counter_up_evt(uuid)', 'execute');
  SELECT has_function_privilege('ex_fn.rollback_counter_up_evt(uuid)', 'execute');

ROLLBACK;
