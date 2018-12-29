-- Revert tunz:structure/band_player from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_band_player ON tunz.band_player;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_band_player();

  DROP TABLE IF EXISTS tunz.band_player CASCADE;

COMMIT;
