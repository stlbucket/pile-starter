-- Revert auth:0050-app-tenant from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_app_tenant ON auth.app_tenant;

  DROP FUNCTION IF EXISTS auth.fn_timestamp_update_app_tenant();

  DROP TABLE IF EXISTS auth.app_tenant;

COMMIT;
