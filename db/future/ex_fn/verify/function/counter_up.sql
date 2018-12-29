-- Verify ex_fn:function/counter_up on pg

BEGIN;

  SELECT has_function_privilege('ex_fn.counter_up()', 'execute');

ROLLBACK;
