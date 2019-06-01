
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_strain CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_strain (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  external_id TEXT,
  name TEXT,
  deleted_at TIMESTAMP,
  global_id text,
  -----
  strain_id uuid NOT NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_strain PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_strain ADD CONSTRAINT fk_strain_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_strain ADD CONSTRAINT fk_strain_strain FOREIGN KEY ( strain_id ) REFERENCES soro.strain( id );
--||--
GRANT select ON TABLE leaf.lf_strain TO soro_user;
`
