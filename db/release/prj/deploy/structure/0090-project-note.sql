
-- Deploy prj:structure/0090-project-note to pg
-- requires: prj:structure/0080-task-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.project_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  prj_note_id bigint NOT NULL,
  project_id bigint NOT NULL,
  app_tenant_id bigint NOT NULL,
  CONSTRAINT pk_project_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.project_note TO app_user;
GRANT insert ON TABLE prj.project_note TO app_user;
GRANT update ON TABLE prj.project_note TO app_user;
GRANT delete ON TABLE prj.project_note TO app_user;
--||--
alter table prj.project_note enable row level security;
--||--
create policy select_project on prj.project_note for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.project_note is E'@omit create,update,delete';

COMMIT;
