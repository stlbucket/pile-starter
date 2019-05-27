exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.manifest_type;
`

const upScript = `
CREATE TYPE leaf.manifest_type AS ENUM (
  'delivery',
  'pickup',
  'pick_up',
  'transporter'
);
`
