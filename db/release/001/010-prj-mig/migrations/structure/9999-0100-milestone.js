exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.milestone CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.milestone CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.milestone (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  created_at timestamp with time zone not null default current_timestamp,
  seller_id uuid NOT NULL,
  milestone_identifier text,
  name text,
  description text,
  project_id uuid NULL,
  due_at timestamp with time zone null,
  completed_at timestamp with time zone null,
  CONSTRAINT pk_milestone PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.milestone TO soro_user;
`
