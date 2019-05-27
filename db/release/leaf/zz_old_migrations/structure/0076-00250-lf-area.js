
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_area CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_area (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at text,
  updated_at text,
  external_id text,
  name text,
  deleted_at text,
  type leaf.lf_area_type,
  is_quarantine_area boolean,
  global_id text,
  -----
  room_id uuid NOT NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_area PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_area ADD CONSTRAINT fk_area_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_area ADD CONSTRAINT fk_area_room FOREIGN KEY ( room_id ) REFERENCES soro.room( id );
--||--
GRANT select ON TABLE leaf.lf_area TO soro_user;
`
