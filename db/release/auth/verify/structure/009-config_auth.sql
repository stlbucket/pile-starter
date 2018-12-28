-- Verify auth:structure/config on pg

BEGIN;

  SELECT
    id,
    key,
    value
  FROM auth.config_auth
  WHERE FALSE;

ROLLBACK;
