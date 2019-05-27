
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.lf_inventory_adjustment CASCADE;
`

const upScript = `
CREATE TABLE leaf.lf_inventory_adjustment (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  external_id text,
  adjusted_at TIMESTAMP NULL,
  qty NUMERIC(20,4),
  uom leaf.uom,
  reason leaf.lf_adjustment_reason,
  memo text,
  deleted_at TIMESTAMP NULL,
  global_id text,
  global_mme_id text,
  global_user_id text,
  global_inventory_id text,
  global_adjusted_by_user_id text,
  -----
  inventory_lot_id uuid NULL,
  seller_id uuid NOT NULL,
  import_result leaf.lf_import_result NOT NULL,
  import_message text,
  CONSTRAINT pk_lf_inventory_adjustment PRIMARY KEY (id)
);
--||--
ALTER TABLE leaf.lf_inventory_adjustment ADD CONSTRAINT fk_lf_inventory_adjustment_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
--||--
ALTER TABLE leaf.lf_inventory_adjustment ADD CONSTRAINT fk_lf_inventory_adjustment_inventory_lot FOREIGN KEY ( inventory_lot_id ) REFERENCES soro.inventory_lot( id );
--||--
GRANT select ON TABLE leaf.lf_inventory_adjustment TO soro_user;
`
