-- Revert tunz:structure/session_producer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_session_producer ON tunz.session_producer;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_session_producer();

  DROP TABLE IF EXISTS tunz.session_producer CASCADE;

COMMIT;
