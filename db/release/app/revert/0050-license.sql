-- Revert app:structure/license from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_license ON app.license;

  DROP FUNCTION IF EXISTS app.fn_timestamp_update_license();

  DROP TABLE IF EXISTS app.license CASCADE;

COMMIT;
