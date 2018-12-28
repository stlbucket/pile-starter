-- Deploy auth:structure/config to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE auth.config_auth (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    key text,
    value text,
    CONSTRAINT pk_config_auth PRIMARY KEY (id)
  );

  GRANT select ON TABLE auth.config_auth TO app_super_admin;
  GRANT insert ON TABLE auth.config_auth TO app_super_admin;
  GRANT update ON TABLE auth.config_auth TO app_super_admin;
  GRANT delete ON TABLE auth.config_auth TO app_super_admin;

  comment on table auth.config_auth is E'@omit create,update,delete';

COMMIT;
