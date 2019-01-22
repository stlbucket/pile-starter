-- Revert bimo:structure/game from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_game ON bimo.game;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_game();

  DROP TABLE IF EXISTS bimo.game CASCADE;

COMMIT;
