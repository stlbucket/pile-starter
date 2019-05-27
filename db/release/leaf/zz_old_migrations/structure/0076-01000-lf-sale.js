
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_sale CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_sale (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp,
  updated_at timestamp,
  external_id text,
  global_customer_id text,
  patient_medical_id text,
  sold_at timestamp,
  sold_to text,
  type text,
  discount_total numeric(20,2),
  price_total numeric(20,2),
  tax_total numeric(20,2),
  reason text,
  status text,
  cog_total numeric(20,2),
  deleted_at timestamp,
  global_id text,
  global_caregiver_id text,
  caregiver_id text,
  global_mme_id text,
  global_user_id text,
  global_sold_by_user_id text,
  global_area_id text,
 -----
  order_info_id uuid NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_sale PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_sale ADD CONSTRAINT fk_inventory_transfer_item_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_sale ADD CONSTRAINT fk_inventory_transfer_item_order_info FOREIGN KEY ( order_info_id ) REFERENCES soro.order_info( id );
--||--
GRANT select ON TABLE leaf.lf_sale TO soro_user;
`
