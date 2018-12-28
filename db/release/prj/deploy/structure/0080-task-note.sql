
-- Deploy prj:structure/0080-task-note to pg
-- requires: prj:structure/0070-prj-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.task_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  task_id bigint NOT NULL,
  CONSTRAINT pk_task_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_note TO soro_user;
COMMIT;
