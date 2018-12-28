exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.project CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.project CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.project (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  seller_id bigint NOT NULL,
  name text,
  CONSTRAINT pk_project PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.project TO soro_user;
`
