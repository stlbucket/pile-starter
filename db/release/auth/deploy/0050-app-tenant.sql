-- Deploy auth:0050-app-tenant to pg
-- requires: 0040-jwt-token

BEGIN;

  CREATE TABLE auth.app_tenant (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    name text NOT NULL,
    identifier text NOT NULL UNIQUE,
    CHECK (identifier <> ''),
    CONSTRAINT pk_app_tenant PRIMARY KEY (id)
  );
  --||--
  GRANT select ON TABLE auth.app_tenant TO app_user;
  GRANT insert ON TABLE auth.app_tenant TO app_super_admin;
  GRANT update ON TABLE auth.app_tenant TO app_super_admin;
  GRANT delete ON TABLE auth.app_tenant TO app_super_admin;
 --||--

  --||--
  CREATE FUNCTION auth.fn_timestamp_update_app_tenant() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_app_tenant
    BEFORE INSERT OR UPDATE ON auth.app_tenant
    FOR EACH ROW
    EXECUTE PROCEDURE auth.fn_timestamp_update_app_tenant();
  --||--

  comment on table auth.app_tenant is E'@omit create,update,delete';

  comment on column auth.app_tenant.id is
  E'@omit create';
  comment on column auth.app_tenant.created_at is
  E'@omit create,update';
  comment on column auth.app_tenant.updated_at is
  E'@omit create,update';

COMMIT;
