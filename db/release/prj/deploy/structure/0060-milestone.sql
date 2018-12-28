
-- Deploy prj:structure/0060-milestone to pg
-- requires: prj:structure/0050-contact-task-role

BEGIN;
CREATE TABLE IF NOT EXISTS prj.milestone (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL,
  app_tenant_id bigint NOT NULL,
  milestone_identifier text,
  name text,
  description text,
  project_id bigint NULL,
  due_at timestamp with time zone null,
  completed_at timestamp with time zone null,
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
create policy select_project on prj.milestone for select
  using (auth_fn.app_user_has_access(app_tenant_id) = true);
--||--
comment on table prj.milestone is E'@omit create,update,delete';

COMMIT;
