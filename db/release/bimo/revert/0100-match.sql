-- Revert bimo:structure/match from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_match ON bimo.match;

  DROP FUNCTION IF EXISTS bimo.fn_timestamp_update_match();

  DROP TABLE IF EXISTS bimo.match CASCADE;

COMMIT;
