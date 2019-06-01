-- Verify evt:structure/evt on pg

BEGIN;

  SELECT
    id,
    created_by_app_user_id,
    captured_at,
    updated_at,
    params,
    outcomes,
    result
  FROM evt.evt
  WHERE FALSE;

ROLLBACK;
