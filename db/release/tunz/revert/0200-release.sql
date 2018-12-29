-- Revert tunz:structure/release from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_release ON tunz.release;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_release();

  DROP TABLE IF EXISTS tunz.release CASCADE;

COMMIT;
