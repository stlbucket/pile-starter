-- Revert tunz:structure/show from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_show ON tunz.show;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_show();

  DROP TABLE IF EXISTS tunz.show CASCADE;

COMMIT;
