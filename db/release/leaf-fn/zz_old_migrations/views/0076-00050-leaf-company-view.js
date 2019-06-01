exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const upScript = `
DROP VIEW IF EXISTS leaf.lf_company_view CASCADE;

CREATE VIEW leaf.lf_company_view AS 
  SELECT 
    c.id,
    c.name,
    c.external_id ubi,
    l.external_id state_location_id,
    l.biotrack_id,
    mme.global_id global_mme_id,
    c.company_type,
    c.licenses,
    l.id as location_id,
    l.address1,
    l.address2,
    l.city,
    l.state,
    l.zip
  FROM soro.company c
  JOIN soro.location l ON l.id = c.location_id
  JOIN leaf.mme mme ON mme.location_id = l.id
  GROUP BY
    c.id, c.name, l.id, mme.global_id;
--||--
GRANT select ON TABLE leaf.lf_company_view TO soro_user;
`

const downScript = `
DROP VIEW IF EXISTS leaf.lf_company_view CASCADE;
`
