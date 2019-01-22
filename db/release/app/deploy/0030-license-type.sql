
-- Deploy app:structure/license_type to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app.license_type (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    name text,
    key text unique NOT NULL,
    application_id bigint NOT NULL,
    CONSTRAINT pk_license_type PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE app.license_type ADD CONSTRAINT fk_license_type_application FOREIGN KEY ( application_id ) REFERENCES app.application( id );

  --||--
  CREATE FUNCTION app.fn_timestamp_update_license_type() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_license_type
    BEFORE INSERT OR UPDATE ON app.license_type
    FOR EACH ROW
    EXECUTE PROCEDURE app.fn_timestamp_update_license_type();
  --||--


  --||--
  GRANT select ON TABLE app.license_type TO app_user;
  GRANT insert ON TABLE app.license_type TO app_super_admin;
  GRANT update ON TABLE app.license_type TO app_super_admin;
  GRANT delete ON TABLE app.license_type TO app_super_admin;
  --||--
  -- alter table app.license_type enable row level security;
  -- --||--
  -- create policy select_license_type on app.license_type for select
  --   using (auth_fn.app_user_has_access(app_tenant_id) = true);

  comment on table app.license_type is E'@omit create,update,delete';

COMMIT;
