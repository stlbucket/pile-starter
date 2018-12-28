exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.contact_task_role CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.contact_task_role CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.contact_task_role (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  seller_id bigint NOT NULL,
  name text,
  task_id bigint NOT NULL,
  contact_id bigint NOT NULL,
  task_role_id bigint NOT NULL,
  CONSTRAINT pk_contact_task_role PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.contact_task_role TO soro_user;
`
