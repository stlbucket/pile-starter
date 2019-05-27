exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.inventory_transfer_direction;
`

const upScript = `
CREATE TYPE leaf.inventory_transfer_direction AS ENUM (
  'unknown',
  'inbound', 
  'outbound'
);
`
