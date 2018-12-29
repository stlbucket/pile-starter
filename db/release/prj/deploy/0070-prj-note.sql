
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
create policy select_prj_note on prj.prj_note for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.prj_note is E'@omit create,update,delete';

--||--
CREATE FUNCTION prj.fn_timestamp_update_prj_note() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_prj_note
  BEFORE INSERT OR UPDATE ON prj.prj_note
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_prj_note();
--||--


COMMIT;
