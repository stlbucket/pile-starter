-- Revert tunz:structure/producer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_producer ON tunz.producer;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_producer();

  DROP TABLE IF EXISTS tunz.producer CASCADE;

COMMIT;
