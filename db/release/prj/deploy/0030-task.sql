-- Deploy prj:structure/0030-task to pg
-- requires: prj:structure/0020-project

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  app_tenant_id bigint NOT NULL,
  identifier text,
  name text,
  description text,
  project_id bigint NULL,
  milestone_id bigint NULL,
  due_at timestamp with time zone null,
  completed_at timestamp with time zone null,
  CONSTRAINT pk_task PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task TO app_user;
GRANT insert ON TABLE prj.task TO app_user;
GRANT update ON TABLE prj.task TO app_user;
GRANT delete ON TABLE prj.task TO app_user;
--||--
alter table prj.task enable row level security;
--||--
create policy select_task on prj.task for select
  using (app_tenant_id = auth_fn.current_app_tenant_id());
--||--
GRANT select ON TABLE prj.task TO soro_user;

comment on table prj.task is E'@omit create,update,delete';

--||--
CREATE FUNCTION prj.fn_timestamp_update_task() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_task
  BEFORE INSERT OR UPDATE ON prj.task
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_task();
--||--

COMMIT;
