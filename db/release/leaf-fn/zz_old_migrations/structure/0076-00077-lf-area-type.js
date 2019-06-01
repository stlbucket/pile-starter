exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.lf_area_type;
`

const upScript = `
CREATE TYPE leaf.lf_area_type AS ENUM (
  'none',
  'quarantine',
  'non_quarantine'
);
`
