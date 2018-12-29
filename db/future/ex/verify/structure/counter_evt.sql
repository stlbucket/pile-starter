-- Verify ex:structure/counter_evt on pg

BEGIN;

  SELECT
    id,
    created_at,
    updated_at,
    current_value
  FROM ex.counter_evt
  WHERE FALSE;

ROLLBACK;
