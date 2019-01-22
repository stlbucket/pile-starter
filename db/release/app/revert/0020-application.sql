-- Revert app:structure/application from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_application ON app.application;

  DROP FUNCTION IF EXISTS app.fn_timestamp_update_application();

  DROP TABLE IF EXISTS app.application CASCADE;

COMMIT;
