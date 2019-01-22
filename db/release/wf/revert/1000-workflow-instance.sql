-- Deploy wf:structure/wf to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS wf.workflow_instance CASCADE;

  DROP DOMAIN wf.workflow_instance_state_json;
  
  DROP FUNCTION IF EXISTS wf.fn_timestamp_update_workflow_instance();

COMMIT;
