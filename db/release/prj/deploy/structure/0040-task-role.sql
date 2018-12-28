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
create policy select_project on prj.task_role for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.task_role is E'@omit create,update,delete';

COMMIT;
