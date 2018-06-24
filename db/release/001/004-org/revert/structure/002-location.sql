-- Revert org:structure/location from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_location ON org.location;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_location();

  DROP TABLE IF EXISTS org.location CASCADE;

COMMIT;
