-- Revert org:structure/organization from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_organization ON org.organization;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_organization();

  DROP TABLE IF EXISTS org.organization CASCADE;

COMMIT;
