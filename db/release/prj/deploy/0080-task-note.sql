
-- Deploy prj:structure/0080-task-note to pg
-- requires: prj:structure/0070-prj-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
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
create policy select_task_note on prj.task_note for select
  using (app_tenant_id = auth_fn.current_app_tenant_id());
--||--
comment on table prj.task_note is E'@omit create,update,delete';

--||--
CREATE FUNCTION prj.fn_timestamp_update_task_note() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_task_note
  BEFORE INSERT OR UPDATE ON prj.task_note
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_task_note();
--||--


COMMIT;
