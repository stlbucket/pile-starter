-- Revert app:structure/license_type_permission from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_license_type_permission ON app.license_type_permission;

  DROP FUNCTION IF EXISTS app.fn_timestamp_update_license_type_permission();

  DROP TABLE IF EXISTS app.license_type_permission CASCADE;

COMMIT;
