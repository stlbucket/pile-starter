exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.batch_type;
`

const upScript = `
CREATE TYPE leaf.batch_type AS ENUM (
  'none',
  'propagation_material',
  'plant',
  'harvest',
  'intermediate_end_product',
  'extraction'
);
`
