-- Revert tunz:structure/track from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_track ON tunz.track;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_track();

  DROP TABLE IF EXISTS tunz.track CASCADE;

COMMIT;
