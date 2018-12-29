-- Revert tunz:structure/band_member from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_band_member ON tunz.band_member;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_band_member();

  DROP TABLE IF EXISTS tunz.band_member CASCADE;

COMMIT;
