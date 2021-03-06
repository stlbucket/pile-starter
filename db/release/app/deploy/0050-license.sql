
-- Deploy app:structure/license to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app.license (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    organization_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    name text,
    license_type_id bigint NOT NULL,
    assigned_to_app_user_id bigint NULL,
    CONSTRAINT uq_license_type_assigned_to UNIQUE (assigned_to_app_user_id, license_type_id),
    CONSTRAINT pk_license PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_assigned_to_app_user FOREIGN KEY ( assigned_to_app_user_id ) REFERENCES auth.app_user( id );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_license_type FOREIGN KEY ( license_type_id ) REFERENCES app.license_type( id );
  --||--
  ALTER TABLE app.license ADD CONSTRAINT fk_license_organization_id FOREIGN KEY ( organization_id ) REFERENCES org.organization( id );

  --||--
  CREATE FUNCTION app.fn_timestamp_update_license() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    if NEW.app_tenant_id is null then 
      -- only users with 'SuperAdmin' permission_key will be able to arbitrarily set this value
      -- rls policy (below) will prevent users from specifying an alternate app_tenant_id
      NEW.app_tenant_id := auth_fn.current_app_tenant_id();
    end if;
    NEW.organization_id = (select id from org.organization where actual_app_tenant_id = NEW.app_tenant_id);
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
  GRANT insert ON TABLE app.license TO app_super_admin;
  GRANT update ON TABLE app.license TO app_admin;
  GRANT delete ON TABLE app.license TO app_super_admin;
  --||--
  alter table app.license enable row level security;
  create policy all_license on app.license for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_license on app.license for all to app_super_admin
  using (1 = 1);

  comment on table app.license is E'@omit create,update,delete';
  comment on TABLE app.license is E'@foreignKey (assigned_to_app_user_id) references org.contact_app_user(app_user_id)';

COMMIT;
