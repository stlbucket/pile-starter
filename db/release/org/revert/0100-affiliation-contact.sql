-- Revert org:structure/affiliation_contact from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_affiliation_contact ON org.affiliation_contact;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_affiliation_contact();

  DROP TABLE IF EXISTS org.affiliation_contact CASCADE;

COMMIT;
