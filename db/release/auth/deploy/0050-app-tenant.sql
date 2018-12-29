-- Deploy auth:0050-app-tenant to pg
-- requires: 0040-jwt-token

BEGIN;

  CREATE TABLE auth.app_tenant (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    name text NOT NULL,
    identifier text,
    CONSTRAINT pk_app_tenant PRIMARY KEY (id)
  );
  --||--
  GRANT select ON TABLE auth.app_tenant TO app_super_admin;
  GRANT insert ON TABLE auth.app_tenant TO app_super_admin;
  GRANT update ON TABLE auth.app_tenant TO app_super_admin;
  GRANT delete ON TABLE auth.app_tenant TO app_super_admin;
--  --||--
--  ALTER TABLE auth.app_tenant ENABLE ROW LEVEL SECURITY;
--  --||--
--  CREATE POLICY select_app_tenant ON auth.app_tenant FOR SELECT
--    USING (vendor_id = auth.current_vendor_id());
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

COMMIT;
