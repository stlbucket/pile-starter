
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.mme CASCADE;
`

const upScript = `
CREATE TABLE leaf.mme (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  global_id TEXT,
  leaf_id integer,
  leaf_external_id text,
  name text,
  certificate_number text,
  address1 text,
  address2 text,
  city text,
  state_code text,
  postal_code text,
  country_code text,
  phone text,
  mme_type leaf.mme_type NOT NULL,
  code text,
  sender_receiver text,
  issuer text,
  bio_license_number text,
  fein text,
  bio_org_id text,
  bio_location_id text,
  -----
  location_id uuid NULL,
  import_config jsonb NOT NULL DEFAULT '{}',
  CONSTRAINT pk_mme PRIMARY KEY (id)
);
ALTER TABLE leaf.mme ADD CONSTRAINT fk_mme_location FOREIGN KEY ( location_id ) REFERENCES soro.location( id );
--||--
GRANT select ON TABLE leaf.mme TO soro_user;
`
