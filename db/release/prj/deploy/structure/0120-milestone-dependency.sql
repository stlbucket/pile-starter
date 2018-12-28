

-- Deploy prj:structure/0120-milestone-dependency to pg
-- requires: prj:structure/0110-task-dependency
BEGIN;
CREATE TABLE IF NOT EXISTS prj.milestone_dependency (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  parent_milestone_id bigint NOT NULL,
  child_milestone_id bigint NOT NULL,
  app_tenant_id bigint NOT NULL,
  CONSTRAINT pk_milestone_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_dependency TO app_user;
GRANT insert ON TABLE prj.milestone_dependency TO app_user;
GRANT update ON TABLE prj.milestone_dependency TO app_user;
GRANT delete ON TABLE prj.milestone_dependency TO app_user;
--||--
alter table prj.milestone_dependency enable row level security;
--||--
create policy select_project on prj.milestone_dependency for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.milestone_dependency is E'@omit create,update,delete';

COMMIT;
