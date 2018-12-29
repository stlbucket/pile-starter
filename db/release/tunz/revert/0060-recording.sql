-- Revert tunz:structure/recording from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_recording ON tunz.recording;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_recording();

  DROP TABLE IF EXISTS tunz.recording CASCADE;

COMMIT;
