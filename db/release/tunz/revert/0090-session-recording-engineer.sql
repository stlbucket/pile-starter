-- Revert tunz:structure/session_recording_engineer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_session_recording_engineer ON tunz.session_recording_engineer;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_session_recording_engineer();

  DROP TABLE IF EXISTS tunz.session_recording_engineer CASCADE;

COMMIT;
