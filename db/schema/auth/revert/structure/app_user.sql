-- Revert auth:structure/app_user from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_app_user ON auth.app_user;

  DROP FUNCTION IF EXISTS auth.fn_timestamp_update_app_user();

  DROP TABLE IF EXISTS auth.app_user CASCADE;

COMMIT;
