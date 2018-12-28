-- Deploy prj:structure/0030-task to pg
-- requires: prj:structure/0020-project

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp with time zone not null default current_timestamp,
  app_tenant_id bigint NOT NULL,
  task_identifier text,
  name text,
  description text,
  project_id bigint NULL,
  milestone_id bigint NULL,
  due_at timestamp with time zone null,
  completed_at timestamp with time zone null,
  CONSTRAINT pk_task PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task TO soro_user;
COMMIT;
