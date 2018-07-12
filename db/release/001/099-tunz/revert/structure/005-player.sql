-- Revert tunz:structure/player from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_player ON tunz.player;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_player();

  DROP TABLE IF EXISTS tunz.player CASCADE;

COMMIT;
