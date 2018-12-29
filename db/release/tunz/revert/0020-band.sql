-- Revert tunz:structure/band from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_band ON tunz.band;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_band();

  DROP TABLE IF EXISTS tunz.band CASCADE;

COMMIT;
