-- Revert bimo:structure/tournament from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_tournament ON bimo.tournament;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_tournament();

  DROP TABLE IF EXISTS bimo.tournament CASCADE;

COMMIT;
