exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE leaf.mme_type CASCADE;
`

const upScript = `
CREATE TYPE leaf.mme_type AS ENUM (
  'state', 
  'cultivator', 
  'inspector', 
  'production', 
  'lab', 
  'transporter', 
  'dispensary', 
  'cultivator_production', 
  'cultivator_dispensary_production', 
  'tribe', 
  'co-op',
  'unknown'
);
`
