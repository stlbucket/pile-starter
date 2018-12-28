exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS prj.prj_note CASCADE;
`

const upScript = `
DROP TABLE IF EXISTS prj.prj_note CASCADE;
--||--
CREATE TABLE IF NOT EXISTS prj.prj_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp with time zone not null default current_timestamp,
  seller_id bigint NOT NULL,
  created_by_contact_id bigint NOT NULL,
  title text,
  content text,
  CONSTRAINT pk_prj_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.prj_note TO soro_user;
`
