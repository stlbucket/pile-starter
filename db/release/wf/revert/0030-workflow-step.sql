-- Deploy wf:structure/wf to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS wf.workflow_step CASCADE;

  DROP FUNCTION IF EXISTS wf.fn_timestamp_update_workflow_step();

COMMIT;
