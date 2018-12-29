-- Revert tunz:structure/promoter from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_promoter ON tunz.promoter;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_promoter();

  DROP TABLE IF EXISTS tunz.promoter CASCADE;

COMMIT;
