exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.inventory_transfer_status;
`

const upScript = `
CREATE TYPE leaf.inventory_transfer_status AS ENUM (
  'open', 
  'in_transit', 
  'received', 
  'ready_for_pickup'
);
`
