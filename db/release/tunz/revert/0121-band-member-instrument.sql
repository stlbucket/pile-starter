-- Revert tunz:structure/band_member_instrument from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_band_member_instrument ON tunz.band_member_instrument;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_band_member_instrument();

  DROP TABLE IF EXISTS tunz.band_member_instrument CASCADE;

COMMIT;
