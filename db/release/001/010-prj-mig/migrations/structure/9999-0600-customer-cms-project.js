exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
`

const upScript = `
DO $$ 
    BEGIN
        BEGIN
          ALTER TABLE soro.customer ADD COLUMN cms_project_id UUID NULL;
        EXCEPTION
            WHEN duplicate_column THEN RAISE NOTICE 'column cms_project_id already exists in soro.customer.';
        END;
    END;
$$;
`
