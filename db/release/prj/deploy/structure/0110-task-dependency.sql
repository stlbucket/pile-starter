
-- Deploy prj:structure/0110-task-dependency to pg
-- requires: prj:structure/0100-milestone-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_dependency (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
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
create policy select_project on prj.task_dependency for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.task_dependency is E'@omit create,update,delete';

COMMIT;
