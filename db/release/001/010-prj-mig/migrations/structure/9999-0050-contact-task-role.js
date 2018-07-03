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
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  seller_id uuid NOT NULL,
  name text,
  task_id uuid NOT NULL,
  contact_id uuid NOT NULL,
  task_role_id uuid NOT NULL,
  CONSTRAINT pk_contact_task_role PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.contact_task_role TO soro_user;
`
