
-- Deploy app:structure/license to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app.license (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    name text,
    license_type_id bigint NOT NULL,
    assigned_to_app_user_id bigint NULL,
    CONSTRAINT pk_license PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_assigned_to_app_user FOREIGN KEY ( assigned_to_app_user_id ) REFERENCES auth.app_user( id );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_license_type FOREIGN KEY ( license_type_id ) REFERENCES app.license_type( id );

  --||--
  CREATE FUNCTION app.fn_timestamp_update_license() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_license
    BEFORE INSERT OR UPDATE ON app.license
    FOR EACH ROW
    EXECUTE PROCEDURE app.fn_timestamp_update_license();
  --||--


  --||--
  GRANT select ON TABLE app.license TO app_user;
  GRANT insert ON TABLE app.license TO app_admin;
  GRANT update ON TABLE app.license TO app_admin;
  GRANT delete ON TABLE app.license TO app_admin;
  --||--
  alter table app.license enable row level security;
  --||--
  create policy select_license on app.license for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

  comment on table app.license is E'@omit create,update,delete';

COMMIT;
