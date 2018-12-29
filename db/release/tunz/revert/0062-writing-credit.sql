-- Revert tunz:structure/writing_credit from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_writing_credit ON tunz.writing_credit;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_writing_credit();

  DROP TABLE IF EXISTS tunz.writing_credit CASCADE;

COMMIT;
