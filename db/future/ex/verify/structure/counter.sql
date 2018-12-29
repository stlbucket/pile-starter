-- Verify ex:structure/counter on pg

BEGIN;

  SELECT
    id,
    created_at,
    updated_at,
    current_value
  FROM ex.counter
  WHERE FALSE;

ROLLBACK;
