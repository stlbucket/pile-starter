-- Deploy org:structure/facility to pg
-- requires: structure/organization

BEGIN;

  CREATE TABLE org.facility (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    organization_id bigint NULL,
    location_id bigint NULL,
    name text,
    external_id text,
    CONSTRAINT uq_facility_app_tenant_and_organization_and_name UNIQUE (organization_id, name),
    CONSTRAINT pk_facility PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE org.facility ADD CONSTRAINT fk_facility_organization FOREIGN KEY ( organization_id ) REFERENCES org.organization( id );
  --||--
  ALTER TABLE org.facility ADD CONSTRAINT fk_facility_location FOREIGN KEY ( location_id ) REFERENCES org.location( id );
  --||--
  ALTER TABLE org.facility ADD CONSTRAINT fk_facility_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_facility() RETURNS trigger AS $$
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
  CREATE TRIGGER tg_timestamp_update_facility
    BEFORE INSERT OR UPDATE ON org.facility
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_facility();
  --||--


  --||--
  GRANT select ON TABLE org.facility TO app_user;
  GRANT insert ON TABLE org.facility TO app_user;
  GRANT update ON TABLE org.facility TO app_user;
  GRANT delete ON TABLE org.facility TO app_user;
  --||--
  alter table org.facility enable row level security;
  --||--
  create policy all_facility_app_user on org.facility for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_facility_app_user on org.facility for all to app_super_admin
  using (1 = 1);


  comment on column org.facility.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.facility.id is
  E'@omit create';
  comment on column org.facility.created_at is
  E'@omit create,update';
  comment on column org.facility.updated_at is
  E'@omit create,update';

COMMIT;
