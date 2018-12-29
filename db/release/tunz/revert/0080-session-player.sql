-- Revert tunz:structure/session_player from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_session_player ON tunz.session_player;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_session_player();

  DROP TABLE IF EXISTS tunz.session_player CASCADE;

COMMIT;
