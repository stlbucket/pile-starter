
-- Deploy prj:structure/0070-prj-note to pg
-- requires: prj:structure/0060-milestone

BEGIN;
CREATE TABLE IF NOT EXISTS prj.prj_note (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  created_at timestamp with time zone not null default current_timestamp,
  app_tenant_id bigint NOT NULL,
  created_by_contact_id bigint NOT NULL,
  title text,
  content text,
  CONSTRAINT pk_prj_note PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.prj_note TO soro_user;
COMMIT;
