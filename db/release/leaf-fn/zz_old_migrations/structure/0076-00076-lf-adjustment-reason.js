exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS leaf.lf_adjustment_reason;
`

const upScript = `
CREATE TYPE leaf.lf_adjustment_reason AS ENUM (
  'none',
  'reconciliation',
  'theft',
  'seizure',
  'member_left_the_cooperative',
  'internal_qa_sample',
  'budtender_sample',
  'vendor_sample',
  'create',
  'update',
  'split_to_inventory',
  'split_from_inventory',
  'disposal',
  'transfer'
);
`
