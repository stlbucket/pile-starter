-- Revert bimo:structure/gamer_game_preferences from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_gamer_game_preferences ON bimo.gamer_game_preferences;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_gamer_game_preferences();

  DROP TABLE IF EXISTS bimo.gamer_game_preferences CASCADE;

COMMIT;
