-- Revert evt:custom-type/evt_processing_result from pg

BEGIN;

  DROP TYPE IF EXISTS evt.evt_processing_result CASCADE;

COMMIT;
