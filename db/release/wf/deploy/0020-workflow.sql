-- Deploy wf:structure/wf to pg
-- requires: structure/schema

BEGIN;
  CREATE TABLE wf.workflow (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    version text,
    name text,
    CONSTRAINT pk_workflow PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE wf.workflow ADD CONSTRAINT fk_workflow_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  CREATE FUNCTION wf.fn_timestamp_update_workflow() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_workflow
    BEFORE INSERT OR UPDATE ON wf.workflow
    FOR EACH ROW
    EXECUTE PROCEDURE wf.fn_timestamp_update_workflow();
  --||--


  --||--
  GRANT select ON TABLE wf.workflow TO app_user;
  GRANT insert ON TABLE wf.workflow TO app_user;
  GRANT update ON TABLE wf.workflow TO app_user;
  GRANT delete ON TABLE wf.workflow TO app_user;
  --||--
  alter table wf.workflow enable row level security;
  --||--
  create policy select_workflow on wf.workflow for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
