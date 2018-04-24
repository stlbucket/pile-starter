-- Revert org:structure/facility from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_facility ON org.facility;

  DROP FUNCTION IF EXISTS org.fn_timestamp_update_facility();

  DROP TABLE IF EXISTS org.facility CASCADE;

COMMIT;
