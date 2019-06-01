
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_inventory_transfer(
  text,
  text,
  text,
  text,
  integer,
  text,
  boolean,
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  text,
  leaf.manifest_type,
  leaf.inventory_transfer_status,
  text,
  text,
  text,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  uuid
);
`

const upScript = `
  CREATE OR REPLACE FUNCTION leaf.capture_lf_inventory_transfer(
    _created_at text,
    _updated_at text,
    _external_id text,
    _hold_starts_at text,
    _number_of_edits integer,
    _hold_ends_at text,
    _void boolean,
    _transferred_at text,
    _est_departed_at text,
    _est_arrival_at text,
    _multi_stop boolean,
    _vehicle_description text,
    _vehicle_vin text,
    _vehicle_license_plate text,
    _transfer_manifest text,
    _manifest_type leaf.manifest_type,
    _status leaf.inventory_transfer_status,
    _deleted_at text,
    _transfer_type text,
    _global_id text,
    _test_for_terpenes boolean,
    _transporter_name1 text,
    _transporter_name2 text,
    _global_mme_id text,
    _global_user_id text,
    _global_from_mme_id text,
    _global_to_mme_id text,
    _global_from_user_id text,
    _global_to_user_id text,
    _global_from_customer_id text,
    _global_to_customer_id text,
    _global_transporter_user_id text,
    _global_transporting_mme_id text,
    _seller_id uuid
  )
  RETURNS leaf.lf_inventory_transfer
  as $$
  DECLARE
    _seller leaf.lf_seller_view;
    _customer_id uuid;
    _from_company leaf.lf_company_view;
    _to_company leaf.lf_company_view;
    _inventory_transfer leaf.lf_inventory_transfer;
    _inventory_type soro.inventory_type;
    _order_number text;
    _order_info soro.order_info;
    _import_result leaf.lf_import_result;
    _direction leaf.inventory_transfer_direction;
    _purpose leaf.inventory_transfer_purpose;
  BEGIN
    _import_result := 'Imported';
  
    --get the seller
    SELECT *
    INTO _seller
    FROM leaf.lf_seller_view
    WHERE id = _seller_id;
  
    IF _seller.id IS NULL THEN
      RAISE EXCEPTION 'No seller for _seller_id: %', _seller_id;
    END IF;
  
    SELECT *
    INTO _from_company
    FROM leaf.lf_company_view
    WHERE global_mme_id = _global_from_mme_id;
    
    IF _from_company.id IS NULL THEN
      RAISE EXCEPTION 'No leaf company for _global_from_mme_id: %', _global_from_mme_id;
    END IF;
  
    SELECT *
    INTO _to_company
    FROM leaf.lf_company_view
    WHERE global_mme_id = _global_to_mme_id;
    
    IF _to_company.id IS NULL THEN
      RAISE EXCEPTION 'No leaf company for _global_to_mme_id: %', _global_to_mme_id;
    END IF;
  
    _direction := CASE
      WHEN _to_company.state_location_id = _seller.state_location_id THEN
        'inbound'::leaf.inventory_transfer_direction
      WHEN _from_company.state_location_id = _seller.state_location_id THEN
        'outbound'::leaf.inventory_transfer_direction
    END;
    
    _purpose := CASE
      WHEN _direction = 'outbound' AND _to_company.company_type = 'Vendor' THEN
        'sale'
      WHEN _direction = 'outbound' AND _to_company.company_type = 'QALab' THEN
        'qa'
      WHEN _direction = 'inbound' THEN
        'purchase'
      ELSE
        'unknown'
    END;
  
    -- fuck IF _purpose = 'sale' THEN
    -- fuck   -- look for the customer
    -- fuck   SELECT id
    -- fuck   INTO _customer_id
    -- fuck   FROM leaf.lf_customer_view
    -- fuck   WHERE global_mme_id = _global_to_mme_id
    -- fuck   AND seller_id = _seller_id;
    -- fuck
    -- fuck   IF _customer_id IS NULL THEN
    -- fuck     -- set up customer relationship with seller
    -- fuck     INSERT INTO soro.customer(
    -- fuck         seller_id,
    -- fuck         company_id,
    -- fuck         default_discount_percent
    -- fuck       )
    -- fuck     SELECT
    -- fuck       _seller_id,
    -- fuck       _to_company.id,
    -- fuck       0
    -- fuck     ON CONFLICT (seller_id, company_id)
    -- fuck     DO NOTHING
    -- fuck     RETURNING id INTO _customer_id;
    -- fuck   END IF;
    -- fuck
    -- fuck   -- find existing order info
    -- fuck   SELECT *
    -- fuck   INTO _order_info
    -- fuck   FROM soro.order_info
    -- fuck   WHERE seller_id = _seller_id
    -- fuck   AND customer_id = _customer_id
    -- fuck   AND order_date = (_created_at::timestamp at time zone 'pst')::date;
    -- fuck
    -- fuck   IF _order_info.id IS NULL THEN
    -- fuck     -- get next order number
    -- fuck     _order_number := (
    -- fuck       SELECT 'SO-' || next_order_number FROM soro.seller WHERE id = _seller_id
    -- fuck     );
    -- fuck
    -- fuck     -- increment seller order number
    -- fuck     UPDATE soro.seller
    -- fuck     SET next_order_number = next_order_number + 1
    -- fuck     WHERE id = _seller_id;
    -- fuck
    -- fuck     -- insert the new order info
    -- fuck     INSERT INTO soro.order_info(
    -- fuck       order_date,
    -- fuck       fulfillment_date,
    -- fuck       manifest_date,
    -- fuck       seller_id,
    -- fuck       customer_id,
    -- fuck       order_number,
    -- fuck       status
    -- fuck     )
    -- fuck     SELECT
    -- fuck       (_created_at::timestamp at time zone 'pst')::date,
    -- fuck       CASE WHEN _transferred_at = '' THEN null::timestamp ELSE _transferred_at::timestamp END,
    -- fuck       (_created_at::timestamp at time zone 'pst')::date,
    -- fuck       _seller_id,
    -- fuck       _customer_id,
    -- fuck       _order_number,
    -- fuck       CASE
    -- fuck         WHEN _status = 'received'::leaf.inventory_transfer_status THEN
    -- fuck           'Fulfilled'::soro.order_status
    -- fuck         ELSE
    -- fuck           'Manifested'::soro.order_status
    -- fuck       END
    -- fuck     RETURNING *
    -- fuck     INTO _order_info
    -- fuck     ;
    -- fuck   ELSE
    -- fuck     UPDATE soro.order_info
    -- fuck     SET fulfillment_date = CASE
    -- fuck       WHEN _transferred_at = '' THEN
    -- fuck         null::timestamp
    -- fuck       ELSE
    -- fuck         _transferred_at::timestamp at time zone 'pst'
    -- fuck       END,
    -- fuck       status = CASE
    -- fuck       WHEN _status = 'received'::leaf.inventory_transfer_status THEN
    -- fuck         'Fulfilled'::soro.order_status
    -- fuck       ELSE
    -- fuck         'Manifested'::soro.order_status
    -- fuck       END
    -- fuck     WHERE id = _order_info.id;
    -- fuck   END IF;
    -- fuck  
    -- fuck   PERFORM soro.calculate_customer_order_frequency(_order_info.customer_id);
    -- fuck END IF;
    
    SELECT *
    INTO _inventory_transfer
    FROM leaf.lf_inventory_transfer
    WHERE global_id = _global_id
    AND seller_id = _seller_id
    ORDER BY updated_at DESC
    LIMIT 1;
  
    IF _inventory_transfer.id IS NULL OR _inventory_transfer.updated_at < _updated_at::timestamp THEN
      INSERT INTO leaf.lf_inventory_transfer(
        created_at,
        updated_at,
        external_id,
        hold_starts_at,
        number_of_edits,
        hold_ends_at,
        void,
        transferred_at,
        est_departed_at,
        est_arrival_at,
        multi_stop,
        vehicle_description,
        vehicle_vin,
        vehicle_license_plate,
        transfer_manifest,
        manifest_type,
        status,
        deleted_at,
        transfer_type,
        global_id,
        test_for_terpenes,
        transporter_name1,
        transporter_name2,
        global_mme_id,
        global_user_id,
        global_from_mme_id,
        global_to_mme_id,
        global_from_user_id,
        global_to_user_id,
        global_from_customer_id,
        global_to_customer_id,
        global_transporter_user_id,
        global_transporting_mme_id,
        direction,
        purpose,
        order_info_id,
        import_result,
        seller_id
      )
      SELECT
        _created_at::timestamp,
        _updated_at::timestamp,
        _external_id,
        CASE WHEN _hold_starts_at = '' THEN null::timestamp ELSE _hold_starts_at::timestamp END,
        _number_of_edits,
        CASE WHEN _hold_ends_at = '' THEN null::timestamp ELSE _hold_ends_at::timestamp END,
        _void,
        CASE WHEN _transferred_at = '' THEN null::timestamp ELSE _transferred_at::timestamp END,
        CASE WHEN _est_departed_at = '' THEN null::timestamp ELSE _est_departed_at::timestamp END,
        CASE WHEN _est_arrival_at = '' THEN null::timestamp ELSE _est_arrival_at::timestamp END,
        _multi_stop,
        _vehicle_description,
        _vehicle_vin,
        _vehicle_license_plate,
        _transfer_manifest,
        _manifest_type,
        _status,
        CASE WHEN _deleted_at = '' THEN null::timestamp ELSE _deleted_at::timestamp END,
        _transfer_type,
        _global_id,
        _test_for_terpenes,
        _transporter_name1,
        _transporter_name2,
        _global_mme_id,
        _global_user_id,
        _global_from_mme_id,
        _global_to_mme_id,
        _global_from_user_id,
        _global_to_user_id,
        _global_from_customer_id,
        _global_to_customer_id,
        _global_transporter_user_id,
        _global_transporting_mme_id,
        _direction,
        _purpose,
        _order_info.id,
        _import_result,
        _seller_id
      RETURNING * INTO _inventory_transfer;
    END IF;
  
    RETURN _inventory_transfer;
  END;
  $$ language plpgsql strict security definer;
  --||--
  GRANT execute ON FUNCTION leaf.capture_lf_inventory_transfer(
    text,
    text,
    text,
    text,
    integer,
    text,
    boolean,
    text,
    text,
    text,
    boolean,
    text,
    text,
    text,
    text,
    leaf.manifest_type,
    leaf.inventory_transfer_status,
    text,
    text,
    text,
    boolean,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    uuid
  ) TO soro_user;
`
