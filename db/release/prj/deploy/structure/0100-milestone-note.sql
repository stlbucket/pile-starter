
-- Deploy prj:structure/0100-milestone-note to pg
-- requires: prj:structure/0090-project-note

BEGIN;
CREATE TABLE IF NOT EXISTS prj.milestone_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  milestone_id bigint NOT NULL,
  CONSTRAINT pk_milestone_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_note TO soro_user;
COMMIT;
