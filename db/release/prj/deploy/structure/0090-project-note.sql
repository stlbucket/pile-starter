
-- Deploy prj:structure/0090-project-note to pg
-- requires: prj:structure/0080-task-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.project_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  project_id bigint NOT NULL,
  CONSTRAINT pk_project_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.project_note TO soro_user;
COMMIT;
