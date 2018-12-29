-- Revert evt:custom-type/evt_processing_result from pg

BEGIN;

  DROP TYPE IF EXISTS tunz.track_status CASCADE;

COMMIT;
