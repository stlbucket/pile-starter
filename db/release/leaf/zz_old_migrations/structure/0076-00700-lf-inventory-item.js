
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_inventory_item CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_inventory_item (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  external_id text,
  lab_retest_id text,
  is_initial_inventory BOOLEAN,
  inventory_created_at TIMESTAMP,
  inventory_packaged_at TIMESTAMP,
  qty NUMERIC(20,2),
  uom leaf.uom NULL,
  sent_for_testing BOOLEAN,
  deleted_at TIMESTAMP,
  medically_compliant BOOLEAN,
  global_id text,
  legacy_id text,
  lab_result_file_path text,
  lab_results_attested BOOLEAN,
  lab_results_date TIMESTAMP,
  global_original_id text,
  batch_type leaf.batch_type,
  global_mme_id text,
  global_user_id text,
  global_batch_id text,
  global_area_id text,
  global_lab_result_id text,
  global_strain_id text,
  global_inventory_type_id text,
  global_created_by_mme_id text,
  -----
  inventory_lot_id uuid NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_inventory_item PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_inventory_item ADD CONSTRAINT fk_lf_inventory_item_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_inventory_item ADD CONSTRAINT fk_lf_inventory_item_inventory_lot FOREIGN KEY ( inventory_lot_id ) REFERENCES soro.inventory_lot( id ) ON DELETE SET NULL;
--||--
GRANT select ON TABLE leaf.lf_inventory_item TO soro_user;
`
