

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
    if NEW.app_tenant_id is null then 
      -- only users with 'SuperAdmin' permission_key will be able to arbitrarily set this value
      -- rls policy (below) will prevent users from specifying an alternate app_tenant_id
      NEW.app_tenant_id := auth_fn.current_app_tenant_id();
    end if;
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
  create policy all_license_permission on app.license_permission for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_license_permission on app.license_permission for all to app_super_admin
  using (1 = 1);

  -- comment on table app.license_permission is E'@omit create,update,delete';

COMMIT;
