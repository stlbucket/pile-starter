-- Revert tunz:structure/song from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_song ON tunz.song;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_song();

  DROP TABLE IF EXISTS tunz.song CASCADE;

COMMIT;
