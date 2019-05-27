exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.inventory_transfer_purpose;
`

const upScript = `
CREATE TYPE leaf.inventory_transfer_purpose AS ENUM (
  'unknown',
  'sale', 
  'qa',
  'purchase'
);
`
