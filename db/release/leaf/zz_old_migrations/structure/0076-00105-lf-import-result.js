exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE leaf.lf_import_result CASCADE;
`

const upScript = `
CREATE TYPE leaf.lf_import_result AS ENUM (
  'Imported',
  'Updated',
  'Error',
  'Processed'
);
`
