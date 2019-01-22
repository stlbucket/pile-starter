-- Revert app:structure/license_type from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_license_type ON app.license_type;

  DROP FUNCTION IF EXISTS app.fn_timestamp_update_license_type();

  DROP TABLE IF EXISTS app.license_type CASCADE;

COMMIT;
