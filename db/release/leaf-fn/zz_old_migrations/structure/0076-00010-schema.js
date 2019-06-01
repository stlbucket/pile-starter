exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP SCHEMA IF EXISTS leaf CASCADE;
`

const upScript = `
DROP SCHEMA IF EXISTS leaf CASCADE;
--||--
CREATE SCHEMA IF NOT EXISTS leaf;
--||--
GRANT usage ON SCHEMA leaf TO soro_anonymous, soro_user;
`
