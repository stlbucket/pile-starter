-- Revert bimo:structure/tournament_entry from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_tournament_entry ON bimo.tournament_entry;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_tournament_entry();

  DROP TABLE IF EXISTS bimo.tournament_entry CASCADE;

COMMIT;
