
-- Deploy prj:structure/0110-task-dependency to pg
-- requires: prj:structure/0100-milestone-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_dependency (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  parent_task_id bigint NOT NULL,
  child_task_id bigint NOT NULL,
  CONSTRAINT pk_task_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_dependency TO soro_user;
COMMIT;
