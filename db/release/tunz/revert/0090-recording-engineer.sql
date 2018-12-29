-- Revert tunz:structure/recording_engineer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_recording_engineer ON tunz.recording_engineer;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_recording_engineer();

  DROP TABLE IF EXISTS tunz.recording_engineer CASCADE;

COMMIT;
