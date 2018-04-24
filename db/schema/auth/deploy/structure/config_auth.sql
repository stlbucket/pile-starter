-- Deploy auth:structure/config to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE auth.config_auth (
    id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
    key text,
    value text,
    CONSTRAINT pk_config_auth PRIMARY KEY (id)
  );

  GRANT select ON TABLE auth.config_auth TO app_super_admin;

COMMIT;
