-- Deploy wf:structure/wf to pg
-- requires: structure/schema

BEGIN;
  CREATE TABLE wf.workflow_step (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    workflow_id bigint NOT NULL,
    name text,
    CONSTRAINT pk_workflow_step PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE wf.workflow_step ADD CONSTRAINT fk_workflow_step_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE wf.workflow_step ADD CONSTRAINT fk_workflow_step_workflow FOREIGN KEY ( workflow_id ) REFERENCES wf.workflow( id );
  --||--
  CREATE FUNCTION wf.fn_timestamp_update_workflow_step() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_workflow_step
    BEFORE INSERT OR UPDATE ON wf.workflow_step
    FOR EACH ROW
    EXECUTE PROCEDURE wf.fn_timestamp_update_workflow_step();
  --||--


  --||--
  GRANT select ON TABLE wf.workflow_step TO app_user;
  GRANT insert ON TABLE wf.workflow_step TO app_user;
  GRANT update ON TABLE wf.workflow_step TO app_user;
  GRANT delete ON TABLE wf.workflow_step TO app_user;
  --||--
  alter table wf.workflow_step enable row level security;
  --||--
  create policy select_workflow_step on wf.workflow_step for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
