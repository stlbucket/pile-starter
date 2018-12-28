-- Deploy prj:structure/0020-project to pg
-- requires: prj:structure/0010-schema

BEGIN;
CREATE TABLE IF NOT EXISTS prj.project (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  app_tenant_id bigint NOT NULL,
  name text,
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
create policy select_project on prj.project for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.project is E'@omit create,update,delete';

COMMIT;
