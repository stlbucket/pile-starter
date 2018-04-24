-- Revert org:structure/contact from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_contact ON org.contact;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_contact();

  DROP TABLE IF EXISTS org.contact CASCADE;

COMMIT;
