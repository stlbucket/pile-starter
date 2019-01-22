-- Revert bimo:structure/game from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_gamer ON bimo.gamer;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_gamer();

  DROP TABLE IF EXISTS bimo.gamer CASCADE;

COMMIT;
