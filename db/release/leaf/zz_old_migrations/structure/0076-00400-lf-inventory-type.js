
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_inventory_type CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_inventory_type (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at text,
  updated_at text,
  external_id text,
  name text,
  product_stage leaf.lf_product_stage,
  uom leaf.uom,
  deleted_at text,
  intermediate_type leaf.intermediate_type,
  global_id text,
  global_mme_id text,
  global_user_id text,
  -----
  inventory_type_id uuid NOT NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_inventory_type PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_inventory_type ADD CONSTRAINT fk_lf_inventory_type_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_inventory_type ADD CONSTRAINT fk_lf_inventory_type_inventory_type FOREIGN KEY ( inventory_type_id ) REFERENCES soro.inventory_type( id );
--||--
GRANT select ON TABLE leaf.lf_inventory_type TO soro_user;
`
