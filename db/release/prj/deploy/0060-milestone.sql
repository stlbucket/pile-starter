
-- Deploy prj:structure/0060-milestone to pg
-- requires: prj:structure/0050-contact-task-role

BEGIN;
CREATE TABLE IF NOT EXISTS prj.milestone (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  app_tenant_id bigint NOT NULL,
  identifier text,
  name text NOT NULL,
  description text,
  project_id bigint NULL,
  due_at timestamp with time zone null,
  completed_at timestamp with time zone null,
  CHECK (name <> ''),
  CONSTRAINT uq_milestone_project_and_name UNIQUE (project_id, name),
  CONSTRAINT pk_milestone PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone TO app_user;
GRANT insert ON TABLE prj.milestone TO app_user;
GRANT update ON TABLE prj.milestone TO app_user;
GRANT delete ON TABLE prj.milestone TO app_user;
--||--
alter table prj.milestone enable row level security;
--||--
create policy select_milestone on prj.milestone for select
  using (app_tenant_id = auth_fn.current_app_tenant_id());
--||--
comment on table prj.milestone is E'@omit create,update,delete';

--||--
CREATE FUNCTION prj.fn_timestamp_update_milestone() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
--||--
CREATE TRIGGER tg_timestamp_update_milestone
  BEFORE INSERT OR UPDATE ON prj.milestone
  FOR EACH ROW
  EXECUTE PROCEDURE prj.fn_timestamp_update_milestone();
--||--


COMMIT;
