-- Verify auth:structure/permission on pg

BEGIN;

  SELECT
    id,
    created_at,
    key
  FROM auth.permission
  WHERE FALSE;

ROLLBACK;
