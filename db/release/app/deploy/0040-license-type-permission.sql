

-- Deploy app:structure/license_type_permission to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app.license_type_permission (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    license_type_id bigint NOT NULL,
    permission_id bigint NOT NULL,
    key text unique NOT NULL,
    CONSTRAINT pk_license_type_permission PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE app.license_type_permission ADD CONSTRAINT fk_license_type_permission_license_type FOREIGN KEY ( license_type_id ) REFERENCES app.license_type( id );
  --||--
  ALTER TABLE app.license_type_permission ADD CONSTRAINT fk_license_type_permission_permission FOREIGN KEY ( permission_id ) REFERENCES auth.permission( id );

  --||--
  CREATE FUNCTION app.fn_timestamp_update_license_type_permission() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_license_type_permission
    BEFORE INSERT OR UPDATE ON app.license_type_permission
    FOR EACH ROW
    EXECUTE PROCEDURE app.fn_timestamp_update_license_type_permission();
  --||--


  --||--
  GRANT select ON TABLE app.license_type_permission TO app_user;
  GRANT insert ON TABLE app.license_type_permission TO app_super_admin;
  GRANT update ON TABLE app.license_type_permission TO app_super_admin;
  GRANT delete ON TABLE app.license_type_permission TO app_super_admin;
  --||--
  -- alter table app.license_type_permission enable row level security;
  -- --||--
  -- create policy select_license_type_permission on app.license_type_permission for select
  --   using (auth_fn.app_user_has_access(app_tenant_id) = true);

  -- comment on table app.license_type_permission is E'@omit create,update,delete';

COMMIT;
