exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.derive_orders_from_lf_sales(
  uuid
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.derive_orders_from_lf_transfers(
  _seller_id uuid
)
RETURNS jsonb
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _customer_company leaf.lf_company_view;
  _customer leaf.lf_customer_view;
  _xfer leaf.lf_inventory_transfer;
  _xfer_item leaf.lf_inventory_transfer_item;
  _order_number text;
  _order_info soro.order_info;
  _order_line_item soro.order_line_item;
  _lf_inventory_type leaf.lf_inventory_type;
  _inventory_type soro.inventory_type;
  _strain soro.strain;
  _inventory_group soro.inventory_group;
  _inventory_lot soro.inventory_lot;
  _category_name text;
  _number_of_orders_created integer;
  _growflow_price_date text;
  _item_price numeric(20,2);
  _total_sales numeric(20,2);
  _summary jsonb;
BEGIN
  _number_of_orders_created := 0;
  _total_sales := 0;
  _summary := '{}';

  --get the seller
  SELECT *
  INTO _seller
  FROM leaf.lf_seller_view
  WHERE id = _seller_id;

  IF _seller.id IS NULL THEN
    RAISE EXCEPTION 'No seller for _seller.id: %', _seller.id;
  END IF;

  --initialize our summary
  SELECT _summary || jsonb_build_object('seller_id', _seller.id) INTO _summary;
  SELECT _summary || jsonb_build_object('seller_name', _seller.name) INTO _summary;

  FOR _xfer IN
    SELECT lit.*
    FROM leaf.lf_inventory_transfer lit
    JOIN leaf.lf_company_view lcv
      ON lcv.global_mme_id = lit.global_to_mme_id
      AND lcv.company_type = 'Vendor'
    WHERE lit.seller_id = _seller_id
    AND lit.import_result = 'Imported'
    AND lit.status = 'received'
    AND lit.direction = 'outbound'
  LOOP -- sale

    _customer := NULL;
    _customer_company := NULL;

    -- customer
    SELECT *
    INTO _customer
    FROM leaf.lf_customer_view
    WHERE global_mme_id = _xfer.global_to_mme_id
    AND seller_id = _seller.id
    ;

    IF _customer.id IS NULL THEN
      SELECT *
      INTO _customer_company
      FROM leaf.lf_company_view
      WHERE global_mme_id = _xfer.global_to_mme_id;

      IF _customer_company.id IS NULL THEN
        RAISE EXCEPTION 'NO CUSTOMER COMPANY FOR GLOBAL MME ID: %', xfer.global_mme_id;
      END IF;

      INSERT INTO soro.customer(
          seller_id,
          company_id,
          default_discount_percent
        )
      SELECT
        _seller.id,
        _customer_company.id,
        0
      ON CONFLICT
      DO NOTHING
      ;

      SELECT *
      INTO _customer
      FROM leaf.lf_customer_view
      WHERE global_mme_id = _xfer.global_to_mme_id;
    END IF; -- customer

--    RAISE NOTICE '_customer:  %   %   %', _customer.id, _customer.state_location_id, _customer.name;
--    RAISE NOTICE '_customer_company:  %   %   %', _customer_company.id, _customer_company.state_location_id, _customer_company.name;
--    RAISE NOTICE '---------------------------------------------------------------';

    -- find an existing order_info
    SELECT *
    INTO _order_info
    FROM soro.order_info
    WHERE id = _xfer.order_info_id;

    IF _order_info.id IS NULL THEN -- create new order_info

      IF _order_info.id IS NULL THEN
        -- get next order number
        _order_number := (
          SELECT 'SO-' || next_order_number FROM soro.seller WHERE id = _seller.id
        );

        -- increment seller order number
        UPDATE soro.seller
        SET next_order_number = next_order_number + 1
        WHERE id = _seller_id;

        -- insert the new order info
        INSERT INTO soro.order_info(
          order_date,
          fulfillment_date,
          manifest_date,
          seller_id,
          customer_id,
          order_number,
          status
        )
        SELECT
          _xfer.created_at,
          _xfer.transferred_at,
          _xfer.created_at,
          _seller.id,
          _customer.id,
          _order_number,
          'Fulfilled'::soro.order_status
        RETURNING *
        INTO _order_info
        ;
      END IF;

      PERFORM soro.calculate_customer_order_frequency(_order_info.customer_id);
    END IF; -- end create new order info

    -- mark the transfer as processed
    UPDATE leaf.lf_inventory_transfer
    SET
      import_result = 'Processed',
      order_info_id = _order_info.id
    WHERE id = _xfer.id;

    FOR _xfer_item IN
      SELECT * FROM leaf.lf_inventory_transfer_item
      WHERE global_inventory_transfer_id = _xfer.global_id
      AND import_result = 'Imported'
    LOOP -- sale_item

      -- lf_inventory_type
      SELECT *
      INTO _lf_inventory_type
      FROM leaf.lf_inventory_type
      WHERE global_id = _xfer_item.global_inventory_type_id
      ORDER BY updated_at DESC
      LIMIT 1;


      -- strain
      SELECT *
      INTO _strain
      FROM soro.strain
      WHERE seller_id = _seller_id
      AND name = _xfer_item.strain_name;

--      IF _strain.id IS NULL THEN
--        RAISE NOTICE 'HEY NOW: _xfer_item.strain_name:  %', _xfer_item.strain_name;
--        RAISE EXCEPTION 'HEY NOW: _lf_inventory_transfer_item:  %', _xfer_item.global_id;
--      END IF;

      -- inventory group
      SELECT invg.*
      INTO _inventory_group
      FROM soro.inventory_group invg
      WHERE invg.name = _lf_inventory_type.name || ' - ' || _strain.name
      AND invg.seller_id = _seller.id
      AND invg.strain_id = _strain.id
      AND invg.inventory_type_id = _lf_inventory_type.inventory_type_id
      ;

      IF _inventory_group.id IS NULL THEN
        INSERT INTO soro.inventory_group(
          seller_id,
          inventory_type_id,
          strain_id,
          name,
          base_product_name
        )
        SELECT
          _seller.id,
          _lf_inventory_type.inventory_type_id,
          _strain.id,
          _lf_inventory_type.name || ' - ' || _strain.name,
          _lf_inventory_type.name
        RETURNING *
        INTO _inventory_group;
      END IF;
      -- end inventory group


      -- inventory lot
      SELECT *
      INTO _inventory_lot
      FROM soro.inventory_lot
      WHERE external_id = _xfer_item.global_inventory_id
      AND seller_id = _seller.id;

      SELECT ic.name
      INTO _category_name
      FROM soro.inventory_type it
      JOIN soro.seller_inventory_type_category sitc ON it.id = sitc.inventory_type_id
      JOIN soro.inventory_category ic ON ic.id = sitc.inventory_category_id
      WHERE it.id = _lf_inventory_type.inventory_type_id
      AND sitc.seller_id = _seller.id;

      IF _inventory_lot.id IS NULL THEN
        RAISE EXCEPTION 'Cannot transfer from non-existent lot: %', _xfer_item.global_inventory_id;
        -- INSERT INTO soro.inventory_lot(
        --   category_name,
        --   description,
        --   inventory_type_id,
        --   strain_id,
        --   remaining_quantity,
        --   status,
        --   external_id,
        --   inventory_group_id,
        --   seller_id
        -- )
        -- SELECT
        --   _category_name,
        --   _lf_inventory_type.name,
        --   _lf_inventory_type.inventory_type_id,
        --   _strain.id,
        --   _qty,
        --   'Available',
        --   _xfer_item.global_inventory_id,
        --   _inventory_group.id,
        --   _seller.id
        -- RETURNING *
        -- INTO _inventory_lot
        -- ;
      ELSE
        UPDATE soro.inventory_lot
        SET
          category_name = _category_name,
          description = _lf_inventory_type.name,
--          inventory_type_id = _inventory_type.id,
          strain_id = _strain.id,
          remaining_quantity = _xfer_item.qty,
          inventory_group_id = _inventory_group.id
        WHERE id = _inventory_lot.id
        ;
      END IF;
      -- end inventory lot

      -- order line item
      SELECT *
      INTO _order_line_item
      FROM soro.order_line_item
      WHERE external_id = _xfer_item.global_id
      AND order_info_id = _order_info.id;

      IF _order_line_item.id IS NULL THEN

        _growflow_price_date := _seller.import_config->('growflow_price_date');

        IF _growflow_price_date IS NULL THEN
          _item_price := _xfer_item.price;
        ELSE
          _item_price = CASE
            WHEN _xfer_item.created_at < _growflow_price_date::date THEN
              _xfer_item.qty * _xfer_item.price
            ELSE
              _xfer_item.price
            END
          ;
        END IF;

        INSERT INTO soro.order_line_item(
          order_info_id,
          inventory_lot_id,
          gov_inventory_item_id,
          external_id,
          quantity,
          sub_total,
          total_price,
          price_per_unit,
          discount_percent,
          description,
          source_status
        )
        SELECT
          _order_info.id,
          _inventory_lot.id,
          _xfer_item.global_inventory_id,
          _xfer_item.global_id,
          _xfer_item.qty,
          _item_price,
          _item_price,
          CASE
            WHEN _xfer_item.qty = 0 THEN
              0
            ELSE
              (_item_price/_xfer_item.qty)::numeric(20,2)
          END,
          0,
          _lf_inventory_type.name,
          'Historic'
        RETURNING *
        INTO _order_line_item;
      END IF;  -- end order line item

      _total_sales := _total_sales + _item_price;

      -- mark the transfer as processed
      UPDATE leaf.lf_inventory_transfer_item
      SET
        import_result = 'Processed',
        order_line_item_id = _order_line_item.id,
        inventory_lot_id = _inventory_lot.id
      WHERE id = _xfer_item.id;
    END LOOP;  -- sale_item

    UPDATE soro.order_info
    SET
      sub_total = (select sum(sub_total) from soro.order_line_item where order_info_id = _order_line_item.order_info_id),
      total_price = (select sum(total_price) from soro.order_line_item where order_info_id = _order_line_item.order_info_id)
    WHERE id = _order_info.id;

    _number_of_orders_created := _number_of_orders_created + 1;
  END LOOP;  -- sale

  SELECT _summary || jsonb_build_object('number_of_orders_created', _number_of_orders_created) INTO _summary;
  SELECT _summary || jsonb_build_object('total_sales', _total_sales) INTO _summary;

  PERFORM leaf.calculate_inventory_levels(_seller.id);

  RETURN _summary;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.derive_orders_from_lf_transfers(
  uuid
) TO soro_user;

`