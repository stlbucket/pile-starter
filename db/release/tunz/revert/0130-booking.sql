-- Revert tunz:structure/booking from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_booking ON tunz.booking;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_booking();

  DROP TABLE IF EXISTS tunz.booking CASCADE;

COMMIT;
