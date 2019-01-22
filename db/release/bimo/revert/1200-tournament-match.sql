-- Revert bimo:structure/tournament_match from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_tournament_match ON bimo.tournament_match;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_tournament_match();

  DROP TABLE IF EXISTS bimo.tournament_match CASCADE;

COMMIT;
