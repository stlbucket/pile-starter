
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_inventory_transfer CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_inventory_transfer (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp,
  updated_at timestamp,
  external_id text,
  hold_starts_at timestamp null,
  number_of_edits integer,
  hold_ends_at timestamp null,
  void boolean,
  transferred_at timestamp null,
  est_departed_at timestamp null,
  est_arrival_at timestamp null,
  multi_stop boolean,
  vehicle_description text,
  vehicle_vin text,
  vehicle_license_plate text,
  transfer_manifest text,
  manifest_type leaf.manifest_type,
  status leaf.inventory_transfer_status,
  deleted_at timestamp null,
  transfer_type text,
  global_id text,
  test_for_terpenes boolean,
  transporter_name1 text,
  transporter_name2 text,
  global_mme_id text,
  global_user_id text,
  global_from_mme_id text,
  global_to_mme_id text,
  global_from_user_id text,
  global_to_user_id text,
  global_from_customer_id text,
  global_to_customer_id text,
  global_transporter_user_id text,
  global_transporting_mme_id text,
  -----
  order_info_id uuid NULL,
  seller_id uuid NOT NULL,
  direction leaf.inventory_transfer_direction NOT NULL,
  purpose leaf.inventory_transfer_purpose NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_inventory_transfer PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_inventory_transfer ADD CONSTRAINT fk_inventory_transfer_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_inventory_transfer ADD CONSTRAINT fk_inventory_transfer_order_info FOREIGN KEY ( order_info_id ) REFERENCES soro.order_info( id ) ON DELETE SET NULL;
--||--
GRANT select ON TABLE leaf.lf_inventory_transfer TO soro_user;
`
