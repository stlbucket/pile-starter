-- Revert tunz:structure/booker from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_booker ON tunz.booker;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_booker();

  DROP TABLE IF EXISTS tunz.booker CASCADE;

COMMIT;
