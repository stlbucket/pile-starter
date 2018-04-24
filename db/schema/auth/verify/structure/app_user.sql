-- Verify auth:structure/app_user on pg

BEGIN;

  SELECT
    id,
    created_at,
    updated_at,
    username,
    password_hash,
    inactive,
    permission_key
  FROM auth.app_user
  WHERE FALSE;

ROLLBACK;
