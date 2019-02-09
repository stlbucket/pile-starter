
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
create policy select_project_note on prj.project_note for select
  using (app_tenant_id = auth_fn.current_app_tenant_id());
--||--
comment on table prj.project_note is E'@omit create,update,delete';

--||--
CREATE FUNCTION prj.fn_timestamp_update_project_note() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_project_note
  BEFORE INSERT OR UPDATE ON prj.project_note
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_project_note();
--||--


COMMIT;
