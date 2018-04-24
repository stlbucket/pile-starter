-- Revert evt-fn:view/vw_evt_processing_status from pg

BEGIN;

  DROP VIEW IF EXISTS evt_fn.vw_evt_processing_status;

COMMIT;
