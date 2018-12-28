

-- Deploy prj:structure/0120-milestone-dependency to pg
-- requires: prj:structure/0110-task-dependency
BEGIN;
CREATE TABLE IF NOT EXISTS prj.milestone_dependency (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  parent_milestone_id bigint NOT NULL,
  child_milestone_id bigint NOT NULL,
  CONSTRAINT pk_milestone_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_dependency TO soro_user;
COMMIT;
