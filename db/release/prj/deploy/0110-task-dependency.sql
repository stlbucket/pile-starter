
-- Deploy prj:structure/0110-task-dependency to pg
-- requires: prj:structure/0100-milestone-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_dependency (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  parent_task_id bigint NOT NULL,
  child_task_id bigint NOT NULL,
  app_tenant_id bigint NOT NULL,
  CONSTRAINT pk_task_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_dependency TO app_user;
GRANT insert ON TABLE prj.task_dependency TO app_user;
GRANT update ON TABLE prj.task_dependency TO app_user;
GRANT delete ON TABLE prj.task_dependency TO app_user;
--||--
alter table prj.task_dependency enable row level security;
--||--
create policy select_task_dependency on prj.task_dependency for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.task_dependency is E'@omit create,update,delete';

--||--
CREATE FUNCTION prj.fn_timestamp_update_task_dependency() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_task_dependency
  BEFORE INSERT OR UPDATE ON prj.task_dependency
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_task_dependency();
--||--

COMMIT;
