-- Revert bimo:structure/side_gamer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_side_gamer ON bimo.side_gamer;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_side_gamer();

  DROP TABLE IF EXISTS bimo.side_gamer CASCADE;

COMMIT;
