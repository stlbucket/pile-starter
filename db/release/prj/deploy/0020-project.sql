-- Deploy prj:structure/0020-project to pg
-- requires: prj:structure/0010-schema

BEGIN;
CREATE TABLE IF NOT EXISTS prj.project (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  app_tenant_id bigint NOT NULL,
  organization_id bigint NOT NULL,
  name text,
  identifier text,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  CONSTRAINT uq_project_app_tenant_and_identifier UNIQUE (app_tenant_id, identifier),
  CONSTRAINT pk_project PRIMARY KEY (id)
);

--||--
GRANT select ON TABLE prj.project TO app_user;
GRANT insert ON TABLE prj.project TO app_user;
GRANT update ON TABLE prj.project TO app_user;
GRANT delete ON TABLE prj.project TO app_user;
--||--
alter table prj.project enable row level security;
--||--
create policy select_project on prj.project for all
  using (app_tenant_id = auth_fn.current_app_tenant_id());
--||--
  comment on column prj.project.id is
  E'@omit create';
  comment on column prj.project.created_at is
  E'@omit create,update';
  comment on column prj.project.updated_at is
  E'@omit create,update';

  --||--
  CREATE FUNCTION prj.fn_timestamp_update_project() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    if NEW.identifier is null or NEW.identifier = '' then NEW.identifier = NEW.id::text; end if;
    NEW.organization_id = (select id from org.organization where actual_app_tenant_id = NEW.app_tenant_id);
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_project
    BEFORE INSERT OR UPDATE ON prj.project
    FOR EACH ROW
    EXECUTE PROCEDURE prj.fn_timestamp_update_project();
  --||--

COMMIT;
