
-- Deploy prj:structure/0070-prj-note to pg
-- requires: prj:structure/0060-milestone

BEGIN;
CREATE TABLE IF NOT EXISTS prj.prj_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  app_tenant_id bigint NOT NULL,
  created_by_contact_id bigint NOT NULL,
  title text,
  content text,
  CONSTRAINT pk_prj_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.prj_note TO app_user;
GRANT insert ON TABLE prj.prj_note TO app_user;
GRANT update ON TABLE prj.prj_note TO app_user;
GRANT delete ON TABLE prj.prj_note TO app_user;
--||--
alter table prj.prj_note enable row level security;
--||--
create policy select_project on prj.prj_note for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.prj_note is E'@omit create,update,delete';

COMMIT;
