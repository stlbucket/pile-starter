-- Deploy prj:structure/0040-task-role to pg
-- requires: prj:structure/0030-task

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_role (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  name text,
  CONSTRAINT pk_task_role PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_role TO soro_user;
COMMIT;
