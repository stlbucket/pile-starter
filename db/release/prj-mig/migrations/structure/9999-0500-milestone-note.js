exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.milestone_note CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.milestone_note CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.milestone_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  milestone_id bigint NOT NULL,
  CONSTRAINT pk_milestone_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_note TO soro_user;
`
