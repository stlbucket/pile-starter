
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP VIEW IF EXISTS leaf.lf_seller_view CASCADE;
`

const upScript = `
CREATE VIEW leaf.lf_seller_view AS 
  SELECT 
    s.id,
    c.id as company_id,
    c.name,
    c.external_id ubi,
    mme.bio_license_number,
    l.external_id state_location_id,
    mme.global_id global_mme_id,
    l.biotrack_id,
    l.leaf_id,
    c.licenses,
    c.company_type,
    (
      SELECT array_agg(DISTINCT itr.target_license_type)
      FROM soro.inventory_transfer_rule itr
      WHERE itr.transfer_rule = 'Allow'
      AND itr.source_license_type = ANY (c.licenses)
    ) allowed_customer_license_types,
    l.id as location_id,
    l.address1,
    l.address2,
    l.city,
    l.state,
    l.zip,
    mme.import_config
  FROM soro.seller s
  JOIN soro.company c ON c.id = s.company_id
  JOIN soro.location l ON l.id = c.location_id
  JOIN leaf.mme mme ON mme.location_id = l.id
  GROUP BY
    s.id, 
    mme.bio_license_number,
    mme.global_id, 
    c.id, 
    c.name, 
    l.id,
    mme.import_config
    ;

--||--
GRANT select ON TABLE leaf.lf_seller_view TO soro_user;
`

