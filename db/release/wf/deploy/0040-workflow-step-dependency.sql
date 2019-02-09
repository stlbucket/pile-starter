-- Deploy wf:structure/wf to pg
-- requires: structure/schema

BEGIN;
  CREATE TABLE wf.workflow_step_dependency (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    name text,
    parent_id bigint NOT NULL,
    dependent_id bigint NOT NULL,
    CONSTRAINT pk_workflow_step_dependency PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE wf.workflow_step_dependency ADD CONSTRAINT fk_workflow_step_dependency_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE wf.workflow_step_dependency ADD CONSTRAINT fk_workflow_step_dependency_parent FOREIGN KEY ( parent_id ) REFERENCES wf.workflow_step( id );
  --||--
  ALTER TABLE wf.workflow_step_dependency ADD CONSTRAINT fk_workflow_step_dependency_dependent FOREIGN KEY ( dependent_id ) REFERENCES wf.workflow_step( id );
  --||--
  CREATE FUNCTION wf.fn_timestamp_update_workflow_step_dependency() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_workflow_step_dependency
    BEFORE INSERT OR UPDATE ON wf.workflow_step_dependency
    FOR EACH ROW
    EXECUTE PROCEDURE wf.fn_timestamp_update_workflow_step_dependency();
  --||--


  --||--
  GRANT select ON TABLE wf.workflow_step_dependency TO app_user;
  GRANT insert ON TABLE wf.workflow_step_dependency TO app_user;
  GRANT update ON TABLE wf.workflow_step_dependency TO app_user;
  GRANT delete ON TABLE wf.workflow_step_dependency TO app_user;
  --||--
  alter table wf.workflow_step_dependency enable row level security;
  --||--
  create policy select_workflow_step_dependency on wf.workflow_step_dependency for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
