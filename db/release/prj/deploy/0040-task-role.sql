-- Deploy prj:structure/0040-task-role to pg
-- requires: prj:structure/0030-task

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_role (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  name text,
  app_tenant_id bigint NOT NULL,
  CONSTRAINT pk_task_role PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_role TO app_user;
GRANT insert ON TABLE prj.task_role TO app_user;
GRANT update ON TABLE prj.task_role TO app_user;
GRANT delete ON TABLE prj.task_role TO app_user;
--||--
alter table prj.task_role enable row level security;
--||--
create policy select_task_role on prj.task_role for select
  using (app_tenant_id = auth_fn.current_app_tenant_id());
--||--
comment on table prj.task_role is E'@omit create,update,delete';


--||--
CREATE FUNCTION prj.fn_timestamp_update_task_role() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_task_role
  BEFORE INSERT OR UPDATE ON prj.task_role
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_task_role();
--||--


COMMIT;
