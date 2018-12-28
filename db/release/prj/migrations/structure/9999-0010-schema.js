exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP SCHEMA IF EXISTS prj CASCADE;
`

const upScript = `
DROP SCHEMA IF EXISTS prj CASCADE;
--||--
CREATE SCHEMA IF NOT EXISTS prj;
--||--
GRANT usage ON SCHEMA prj TO soro_anonymous, soro_user;
`
