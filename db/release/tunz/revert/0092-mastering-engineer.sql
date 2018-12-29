-- Revert tunz:structure/mastering_engineer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_mastering_engineer ON tunz.mastering_engineer;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_mastering_engineer();

  DROP TABLE IF EXISTS tunz.mastering_engineer CASCADE;

COMMIT;
