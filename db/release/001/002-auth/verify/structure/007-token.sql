-- Verify auth:structure/token on pg

BEGIN;

SELECT
    id,
    app_user_id,
    created_at,
    expires_at
  FROM auth.token
  WHERE FALSE;

ROLLBACK;
