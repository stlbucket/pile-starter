-- Verify auth:0090-config-auth on pg

BEGIN;

  SELECT
    id,
    key,
    value
  FROM auth.config_auth
  WHERE FALSE;

ROLLBACK;
