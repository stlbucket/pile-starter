

-- Deploy app:structure/license_permission to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app.license_permission (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    license_id bigint NOT NULL,
    permission_id bigint NOT NULL,
    CONSTRAINT pk_license_permission PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_permission_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE app.license_permission ADD CONSTRAINT fk_license_permission_license FOREIGN KEY ( license_id ) REFERENCES app.license( id );
  --||--
  ALTER TABLE app.license_permission ADD CONSTRAINT fk_license_permission_permission FOREIGN KEY ( permission_id ) REFERENCES auth.permission( id );

  --||--
  CREATE FUNCTION app.fn_timestamp_update_license_permission() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_license_permission
    BEFORE INSERT OR UPDATE ON app.license_permission
    FOR EACH ROW
    EXECUTE PROCEDURE app.fn_timestamp_update_license_permission();
  --||--


  --||--
  GRANT select ON TABLE app.license_permission TO app_user;
  GRANT insert ON TABLE app.license_permission TO app_admin;
  GRANT update ON TABLE app.license_permission TO app_admin;
  GRANT delete ON TABLE app.license_permission TO app_admin;
  --||--
  alter table app.license_permission enable row level security;
  --||--
  create policy select_license_permission on app.license_permission for all
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

  -- comment on table app.license_permission is E'@omit create,update,delete';

COMMIT;
