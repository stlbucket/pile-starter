exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.project_note CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.project_note CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.project_note (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  prj_note_id uuid NOT NULL,
  project_id uuid NOT NULL,
  CONSTRAINT pk_project_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.project_note TO soro_user;
`
