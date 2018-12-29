-- Revert tunz:structure/mixing_engineer from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_mixing_engineer ON tunz.mixing_engineer;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_mixing_engineer();

  DROP TABLE IF EXISTS tunz.mixing_engineer CASCADE;

COMMIT;
