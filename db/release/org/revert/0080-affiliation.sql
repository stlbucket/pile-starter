-- Revert org:structure/affiliation from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_affiliation ON org.affiliation;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_affiliation();

  DROP TABLE IF EXISTS org.affiliation CASCADE;

COMMIT;
