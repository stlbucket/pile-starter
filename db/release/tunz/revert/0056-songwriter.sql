-- Revert tunz:structure/songwriter from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_songwriter ON tunz.songwriter;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_songwriter();

  DROP TABLE IF EXISTS tunz.songwriter CASCADE;

COMMIT;
