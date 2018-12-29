-- Revert tunz:structure/instrument from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_instrument ON tunz.instrument;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_instrument();

  DROP TABLE IF EXISTS tunz.instrument CASCADE;

COMMIT;
