-- Revert evt:custom-type/evt_processing_result from pg

BEGIN;

  DROP TYPE IF EXISTS msg.message_delivery_status CASCADE;

COMMIT;
