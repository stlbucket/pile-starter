-- Verify evt:structure/evt on pg

BEGIN;

  SELECT
    id,
    created_by_app_user_id,
    created_at,
    updated_at,
    name,
    params,
    outcomes,
    result
  FROM evt.evt
  WHERE FALSE;

ROLLBACK;
