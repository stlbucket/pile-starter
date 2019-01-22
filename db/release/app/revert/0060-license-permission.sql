-- Revert app:structure/license_permission from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_license_permission ON app.license_permission;

  DROP FUNCTION IF EXISTS app.fn_timestamp_update_license_permission();

  DROP TABLE IF EXISTS app.license_permission CASCADE;

COMMIT;
