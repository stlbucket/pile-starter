BEGIN;

  SELECT
    id
  FROM auth.vw_app_tenant
  WHERE FALSE;

ROLLBACK;
