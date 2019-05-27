exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.uom;
`

const upScript = `
CREATE TYPE leaf.uom AS ENUM (
  'none',
  'ea',
  'gm',
  'oz'
);
`
