-- Revert tunz:structure/recording_studio from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_recording_studio ON tunz.recording_studio;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_recording_studio();

  DROP TABLE IF EXISTS tunz.recording_studio CASCADE;

COMMIT;
