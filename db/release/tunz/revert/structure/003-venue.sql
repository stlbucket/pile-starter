-- Revert tunz:structure/venue from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_venue ON tunz.venue;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_venue();

  DROP TABLE IF EXISTS tunz.venue CASCADE;

COMMIT;
