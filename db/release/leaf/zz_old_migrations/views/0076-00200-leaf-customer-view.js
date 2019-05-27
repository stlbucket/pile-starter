exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP VIEW IF EXISTS leaf.lf_customer_view CASCADE;
`

const upScript = `
CREATE OR REPLACE VIEW leaf.lf_customer_view AS 
  SELECT 
    c.name,
    sc.name seller_name,
    c.licenses,
    c.company_type,
    c.external_id ubi,
    cu.default_discount_percent,
    cu.total_sales,
    l.id as location_id,
    l.external_id as state_location_id,
    mme.global_id global_mme_id,
    l.biotrack_id,
    l.address1,
    l.address2,
    l.city,
    l.state,
    l.zip,
    CASE WHEN cu.primary_buyer_contact_id IS NOT NULL THEN
      (SELECT pb.first_name || ' ' || pb.last_name FROM soro.contact pb WHERE id = cu.primary_buyer_contact_id)
    ELSE
      'None set'
    END primary_buyer_name,
    CASE WHEN cu.account_manager_contact_id IS NOT NULL THEN
      (SELECT am.first_name || ' ' || am.last_name FROM soro.contact am WHERE id = cu.account_manager_contact_id)
    ELSE
      'None set'
    END account_manager_name,
    cu.first_order_date,
    cu.last_order_date,
    cu.order_frequency_days,
    cu.next_expected_order_date,
    cu.id,
    c.id as company_id,
    cu.primary_buyer_contact_id,
    cu.account_manager_contact_id,
    s.id as seller_id
  FROM soro.customer cu
  JOIN soro.company c ON c.id = cu.company_id
  JOIN soro.seller s ON s.id = cu.seller_id
  JOIN soro.company sc ON s.company_id = sc.id
  JOIN soro.location l ON l.id = c.location_id
  JOIN leaf.mme mme ON mme.location_id = l.id
  WHERE c.licenses != '{QaLab}'
  AND c.licenses != '{Tribal}'
  AND c.licenses != '{Soro}'
  GROUP BY
    cu.id, c.id, c.name, mme.global_id, sc.name, l.id, s.id;
GRANT SELECT ON TABLE leaf.lf_customer_view TO soro_user;
`

