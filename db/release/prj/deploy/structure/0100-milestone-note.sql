
-- Deploy prj:structure/0100-milestone-note to pg
-- requires: prj:structure/0090-project-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.milestone_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  milestone_id bigint NOT NULL,
  app_tenant_id bigint NOT NULL,
  CONSTRAINT pk_milestone_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_note TO app_user;
GRANT insert ON TABLE prj.milestone_note TO app_user;
GRANT update ON TABLE prj.milestone_note TO app_user;
GRANT delete ON TABLE prj.milestone_note TO app_user;
--||--
alter table prj.milestone_note enable row level security;
--||--
create policy select_project on prj.milestone_note for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.milestone_note is E'@omit create,update,delete';

COMMIT;
