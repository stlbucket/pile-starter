
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
CREATE OR REPLACE FUNCTION leaf.derive_orders_from_lf_sales(
  _seller_id uuid
)
RETURNS jsonb
as $$
DECLARE
  _seller leaf.lf_seller_view;
  _customer_company leaf.lf_company_view;
  _sale leaf.lf_sale;
  _sale_item leaf.lf_sale_item;
  _order_number text;
  _order_info soro.order_info;
  _order_line_item soro.order_line_item;
  _inventory_type soro.inventory_type;
  _number_of_orders_created integer;
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

  FOR _sale IN
    SELECT * FROM leaf.lf_sale WHERE seller_id = _seller_id AND order_info_id IS NULL
  LOOP

    SELECT *
    INTO _customer_company
    FROM leaf.lf_company_view
    WHERE global_mme_id = _sale.global_customer_id;

    IF _customer_company.id IS NULL THEN
      RAISE EXCEPTION 'No leaf company for _global_to_mme_id: %', _sale.global_customer_id;
    END IF;

    SELECT _summary || jsonb_build_object('customer_id', _customer.id) INTO _summary;
    SELECT _summary || jsonb_build_object('customer_name', _customer_company.name) INTO _summary;

    -- find an existing order_info
--    SELECT *
--    INTO _order_info
--    FROM soro.order_info
--    WHERE id = _sale.order_info_id;
--
--    IF _order_info.id IS NULL THEN -- create new order_info
--       -- look for the customer
--      SELECT id
--      INTO _customer_id
--      FROM leaf.lf_customer_view
--      WHERE global_mme_id = _sale.global_customer_id
--      AND seller_id = _seller_id;
--
--      IF _customer_id IS NULL THEN
--        -- set up customer relationship with seller
--        INSERT INTO soro.customer(
--            seller_id,
--            company_id,
--            default_discount_percent
--          )
--        SELECT
--          _seller.id,
--          _to_company.id,
--          0
--        ON CONFLICT (seller_id, company_id)
--        DO NOTHING
--        RETURNING id INTO _customer_id;
--      END IF;
--
--      IF _order_info.id IS NULL THEN
--        -- get next order number
--        _order_number := (
--          SELECT 'SO-' || next_order_number FROM soro.seller WHERE id = _seller_id
--        );
--
--        -- increment seller order number
--        UPDATE soro.seller
--        SET next_order_number = next_order_number + 1
--        WHERE id = _seller_id;
--
--        -- insert the new order info
--        INSERT INTO soro.order_info(
--          order_date,
--          fulfillment_date,
--          manifest_date,
--          seller_id,
--          customer_id,
--          order_number,
--          status
--        )
--        SELECT
--          (_created_at::timestamp at time zone 'pst')::date,
--          CASE WHEN _transferred_at = '' THEN null::timestamp ELSE _transferred_at::timestamp END,
--          (_created_at::timestamp at time zone 'pst')::date,
--          _seller_id,
--          _customer_id,
--          _order_number,
--          CASE
--            WHEN _status = 'received'::leaf.inventory_transfer_status THEN
--              'Fulfilled'::soro.order_status
--            ELSE
--              'Manifested'::soro.order_status
--          END
--        RETURNING *
--        INTO _order_info
--        ;
--      ELSE
--        UPDATE soro.order_info
--        SET fulfillment_date = CASE
--          WHEN _transferred_at = '' THEN
--            null::timestamp
--          ELSE
--            _transferred_at::timestamp at time zone 'pst'
--          END,
--          status = CASE
--          WHEN _status = 'received'::leaf.inventory_transfer_status THEN
--            'Fulfilled'::soro.order_status
--          ELSE
--            'Manifested'::soro.order_status
--          END
--        WHERE id = _order_info.id;
--      END IF;
--
--      PERFORM soro.calculate_customer_order_frequency(_order_info.customer_id);
--    END IF; -- end create new order info

    FOR _sale_item IN
      SELECT * FROM leaf.lf_sale_item WHERE global_sale_id = _sale.global_id
    LOOP
      _total_sales := _total_sales + CASE
        WHEN _sale_item.created_at < '2018-02-21'::date THEN
          _sale_item.qty * _sale_item.price_total
        ELSE
          _sale_item.price_total
        END
      ;
    END LOOP;  -- sale_item

    _number_of_orders_created := _number_of_orders_created + 1;
  END LOOP;  -- sale

  SELECT _summary || jsonb_build_object('number_of_orders_created', _number_of_orders_created) INTO _summary;
  SELECT _summary || jsonb_build_object('total_sales', _total_sales) INTO _summary;

  RAISE EXCEPTION 'summary: %', _summary;

  RETURN _summary;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.derive_orders_from_lf_sales(
  uuid
) TO soro_user;
`
