exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.milestone_dependency CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.milestone_dependency CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.milestone_dependency (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  parent_milestone_id bigint NOT NULL,
  child_milestone_id bigint NOT NULL,
  CONSTRAINT pk_milestone_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_dependency TO soro_user;
`
