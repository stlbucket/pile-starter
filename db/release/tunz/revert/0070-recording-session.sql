-- Revert tunz:structure/recording_session from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_recording_session ON tunz.recording_session;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_recording_session();

  DROP TABLE IF EXISTS tunz.recording_session CASCADE;

COMMIT;
