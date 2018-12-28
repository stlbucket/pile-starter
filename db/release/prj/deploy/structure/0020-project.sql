-- Deploy prj:structure/0020-project to pg
-- requires: prj:structure/0010-schema

BEGIN;
CREATE TABLE IF NOT EXISTS prj.project (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  app_tenant_id bigint NOT NULL,
  name text,
  CONSTRAINT pk_project PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.project TO soro_user;

COMMIT;
