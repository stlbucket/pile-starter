-- Revert tunz:structure/session_player_track from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_session_player_track ON tunz.session_player_track;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_session_player_track();

  DROP TABLE IF EXISTS tunz.session_player_track CASCADE;

COMMIT;
