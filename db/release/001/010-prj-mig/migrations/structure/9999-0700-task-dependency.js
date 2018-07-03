exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.task_dependency CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.task_dependency CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.task_dependency (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  parent_task_id uuid NOT NULL,
  child_task_id uuid NOT NULL,
  CONSTRAINT pk_task_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.task_dependency TO soro_user;
`
