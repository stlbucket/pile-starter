-- Revert org:structure/affiliation_organization from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_affiliation_organization ON org.affiliation_organization;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_affiliation_organization();

  DROP TABLE IF EXISTS org.affiliation_organization CASCADE;

COMMIT;
