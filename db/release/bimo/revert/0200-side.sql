-- Revert bimo:structure/side from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_side ON bimo.side;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_side();

  DROP TABLE IF EXISTS bimo.side CASCADE;

COMMIT;
