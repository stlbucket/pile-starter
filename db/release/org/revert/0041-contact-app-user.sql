-- Revert org:structure/contact from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_contact_app_user ON org.contact_app_user;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_contact_app_user();

  DROP TABLE IF EXISTS org.contact_app_user CASCADE;

COMMIT;
