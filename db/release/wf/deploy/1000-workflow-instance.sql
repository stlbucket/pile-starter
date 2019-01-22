
-- Deploy wf:structure/wf to pg
-- requires: structure/schema

BEGIN;
  create domain wf.workflow_instance_state_json as jsonb;

  CREATE TABLE wf.workflow_instance (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    workflow_id bigint NOT NULL,
    name text,
    state wf.workflow_instance_state_json NOT NULL,
    CONSTRAINT pk_workflow_instance PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE wf.workflow_instance ADD CONSTRAINT fk_workflow_instance_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE wf.workflow_instance ADD CONSTRAINT fk_workflow_instance_workflow FOREIGN KEY ( workflow_id ) REFERENCES wf.workflow( id );
  --||--
  CREATE FUNCTION wf.fn_timestamp_update_workflow_instance() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_workflow_instance
    BEFORE INSERT OR UPDATE ON wf.workflow_instance
    FOR EACH ROW
    EXECUTE PROCEDURE wf.fn_timestamp_update_workflow_instance();
  --||--


  --||--
  GRANT select ON TABLE wf.workflow_instance TO app_user;
  GRANT insert ON TABLE wf.workflow_instance TO app_user;
  GRANT update ON TABLE wf.workflow_instance TO app_user;
  GRANT delete ON TABLE wf.workflow_instance TO app_user;
  --||--
  alter table wf.workflow_instance enable row level security;
  --||--
  create policy select_workflow_instance on wf.workflow_instance for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
