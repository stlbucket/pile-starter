exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.task_note CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.task_note CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.task_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  prj_note_id bigint NOT NULL,
  task_id bigint NOT NULL,
  CONSTRAINT pk_task_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_note TO soro_user;
`
