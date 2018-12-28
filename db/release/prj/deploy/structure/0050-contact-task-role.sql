
-- Deploy prj:structure/0050-contact-task-role to pg
-- requires: prj:structure/0040-task-role

BEGIN;
CREATE TABLE IF NOT EXISTS prj.contact_task_role (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  app_tenant_id bigint NOT NULL,
  name text,
  task_id bigint NOT NULL,
  contact_id bigint NOT NULL,
  task_role_id bigint NOT NULL,
  CONSTRAINT pk_contact_task_role PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.contact_task_role TO app_user;
GRANT insert ON TABLE prj.contact_task_role TO app_user;
GRANT update ON TABLE prj.contact_task_role TO app_user;
GRANT delete ON TABLE prj.contact_task_role TO app_user;
--||--
alter table prj.contact_task_role enable row level security;
--||--
create policy select_project on prj.contact_task_role for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.contact_task_role is E'@omit create,update,delete';

COMMIT;
