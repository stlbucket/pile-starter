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
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  parent_milestone_id uuid NOT NULL,
  child_milestone_id uuid NOT NULL,
  CONSTRAINT pk_milestone_dependency PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone_dependency TO soro_user;
`
