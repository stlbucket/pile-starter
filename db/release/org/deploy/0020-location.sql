-- Deploy org:structure/location to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE org.location (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    name text,
    address1 text,
    address2 text,
    city text,
    state text,
    zip text,
    lat text,
    lon text,
    CONSTRAINT uq_location_app_tenant_and_external_id UNIQUE (app_tenant_id, external_id),
    CONSTRAINT pk_location PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE org.location ADD CONSTRAINT fk_location_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_location() RETURNS trigger AS $$
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
  CREATE TRIGGER tg_timestamp_update_location
    BEFORE INSERT OR UPDATE ON org.location
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_location();
  --||--


  --||--
  GRANT select ON TABLE org.location TO app_user;
  GRANT insert ON TABLE org.location TO app_user;
  GRANT update ON TABLE org.location TO app_user;
  GRANT delete ON TABLE org.location TO app_user;
  --||--
  alter table org.location enable row level security;
  --||--
  create policy all_location on org.location for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_location on org.location for all to app_super_admin
  using (1 = 1);

  comment on column org.location.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.location.id is
  E'@omit create';
  comment on column org.location.created_at is
  E'@omit create,update';
  comment on column org.location.updated_at is
  E'@omit create,update';

COMMIT;
