
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_inventory_transfer_item CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_inventory_transfer_item (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp,
  updated_at timestamp,
  external_id text,
  is_sample boolean,
  sample_type text,
  product_sample_type text,
  description text,
  qty numeric(20,2),
  price numeric(20,2),
  uom leaf.uom,
  received_at timestamp,
  received_qty numeric(20,2),
  deleted_at timestamp,
  retest boolean,
  global_id text,
  is_for_extraction boolean,
  inventory_name text,
  strain_name text,
  global_mme_id text,
  global_user_id text,
  global_batch_id text,
  global_plant_id text,
  global_inventory_id text,
  global_lab_result_id text,
  global_received_area_id text,
  global_received_strain_id text,
  global_inventory_transfer_id text,
  global_received_batch_id text,
  global_received_inventory_id text,
  global_received_plant_id text,
  global_received_mme_id text,
  global_received_mme_user_id text,
  global_customer_id text,
  global_inventory_type_id text,
  -----
  order_line_item_id uuid NULL,
  inventory_lot_id uuid NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_inventory_transfer_item PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_inventory_transfer_item ADD CONSTRAINT fk_inventory_transfer_item_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_inventory_transfer_item ADD CONSTRAINT fk_inventory_transfer_item_order_line_item FOREIGN KEY ( order_line_item_id ) REFERENCES soro.order_line_item( id ) ON DELETE SET NULL;
--||--
ALTER TABLE leaf.lf_inventory_transfer_item ADD CONSTRAINT fk_inventory_transfer_item_inventory_lot FOREIGN KEY ( inventory_lot_id ) REFERENCES soro.inventory_lot( id ) ON DELETE SET NULL;
--||--
GRANT select ON TABLE leaf.lf_inventory_transfer_item TO soro_user;
`
