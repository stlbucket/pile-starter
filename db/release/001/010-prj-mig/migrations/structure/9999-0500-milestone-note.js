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
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  prj_note_id uuid NOT NULL,
  milestone_id uuid NOT NULL,
  CONSTRAINT pk_milestone_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_note TO soro_user;
`
