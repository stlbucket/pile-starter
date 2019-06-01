
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_sale_item CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_sale_item (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp,
  updated_at timestamp,
  external_id text,
  use_by_date text,
  description text,
  sold_at timestamp,
  qty numeric(20,2),
  uom leaf.uom,
  unit_price numeric(20,2),
  discount_total numeric(20,2),
  price_total numeric(20,2),
  tax_total numeric(20,2),
  potency text,
  returned_reason text,
  returned_at timestamp,
  total_marijuana_in_grams text,
  name text,
  unit_cog numeric(20,2),
  deleted_at timestamp,
  global_id text,
  global_mme_id text,
  global_user_id text,
  global_sale_id text,
  global_batch_id text,
  global_returned_by_user_id text,
  global_inventory_id text,
   -----
  order_line_item_id uuid NULL,
  inventory_lot_id uuid NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_sale_item PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_sale_item ADD CONSTRAINT fk_inventory_transfer_item_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_sale_item ADD CONSTRAINT fk_inventory_transfer_item_order_line_item FOREIGN KEY ( order_line_item_id ) REFERENCES soro.order_line_item( id );
--||--
ALTER TABLE leaf.lf_sale_item ADD CONSTRAINT fk_inventory_transfer_item_inventory_lot FOREIGN KEY ( inventory_lot_id ) REFERENCES soro.inventory_lot( id );
--||--
GRANT select ON TABLE leaf.lf_sale_item TO soro_user;
`
