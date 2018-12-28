
-- Deploy prj:structure/0080-task-note to pg
-- requires: prj:structure/0070-prj-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  task_id bigint NOT NULL,
  app_tenant_id bigint NOT NULL,
  CONSTRAINT pk_task_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_note TO app_user;
GRANT insert ON TABLE prj.task_note TO app_user;
GRANT update ON TABLE prj.task_note TO app_user;
GRANT delete ON TABLE prj.task_note TO app_user;
--||--
alter table prj.task_note enable row level security;
--||--
create policy select_project on prj.task_note for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.task_note is E'@omit create,update,delete';

COMMIT;
