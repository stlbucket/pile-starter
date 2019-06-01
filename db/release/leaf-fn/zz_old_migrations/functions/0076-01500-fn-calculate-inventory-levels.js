
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.calculate_inventory_levels(
  uuid
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.calculate_inventory_levels(
  _seller_id uuid
)
RETURNS jsonb
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _summary jsonb;
BEGIN
--    RAISE EXCEPTION 'HEY NOW';

    UPDATE soro.inventory_group ig
    SET
     physical_units = (
       SELECT COALESCE(sum(remaining_quantity), 0)
       FROM soro.inventory_lot
       WHERE inventory_group_id = ig.id
       AND status = 'Available'
     ),
     reserved_units = (
       SELECT COALESCE(sum(quantity), 0)
       FROM soro.inventory_reservation ir
       JOIN soro.inventory_lot il ON il.id = ir.inventory_lot_id
       WHERE il.inventory_group_id = ig.id
       AND status = 'Available'
     )
    WHERE seller_id = _seller_id;

    UPDATE soro.inventory_group
    SET
     available_units = physical_units - reserved_units
    WHERE seller_id = _seller_id;

    UPDATE soro.product prd
    SET
      physical_units = (
        SELECT sum(physical_units)
        FROM soro.inventory_group ig
        JOIN soro.product_group pg ON pg.inventory_group_id = ig.id AND pg.product_id = prd.id
      ),
      reserved_units = (
        SELECT sum(reserved_units)
        FROM soro.inventory_group ig
        JOIN soro.product_group pg ON pg.inventory_group_id = ig.id AND pg.product_id = prd.id
      ),
      available_units = (
        SELECT sum(available_units)
        FROM soro.inventory_group ig
        JOIN soro.product_group pg ON pg.inventory_group_id = ig.id AND pg.product_id = prd.id
      )
    WHERE seller_id = _seller_id;

  RETURN _summary;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.calculate_inventory_levels(
  uuid
) TO soro_user;
`
