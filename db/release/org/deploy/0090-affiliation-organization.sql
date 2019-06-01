-- Deploy org:structure/affiliation_organization to pg
-- requires: structure/organization

BEGIN;

  CREATE TABLE org.affiliation_organization (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    organization_id bigint not null,
    affiliation_id bigint not null,
    CONSTRAINT pk_affiliation_organization PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE org.affiliation_organization ADD CONSTRAINT fk_affiliation_organization_organization FOREIGN KEY ( organization_id ) REFERENCES org.organization( id );
  --||--
  ALTER TABLE org.affiliation_organization ADD CONSTRAINT fk_affiliation_organization_affiliation FOREIGN KEY ( affiliation_id ) REFERENCES org.affiliation( id );
  --||--
  ALTER TABLE org.affiliation_organization ADD CONSTRAINT fk_affiliation_organization_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_affiliation_organization() RETURNS trigger AS $$
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
  CREATE TRIGGER tg_timestamp_update_affiliation_organization
    BEFORE INSERT OR UPDATE ON org.affiliation_organization
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_affiliation_organization();
  --||--


  --||--
  GRANT select ON TABLE org.affiliation_organization TO app_user;
  GRANT insert ON TABLE org.affiliation_organization TO app_user;
  GRANT update ON TABLE org.affiliation_organization TO app_user;
  GRANT delete ON TABLE org.affiliation_organization TO app_user;
  --||--
  alter table org.affiliation_organization enable row level security;
  --||--
  create policy all_affiliation_organization_app_user on org.affiliation_organization for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_affiliation_organization_app_user on org.affiliation_organization for all to app_super_admin
  using (1 = 1);


  comment on column org.affiliation_organization.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.affiliation_organization.id is
  E'@omit create';
  comment on column org.affiliation_organization.created_at is
  E'@omit create,update';
  comment on column org.affiliation_organization.updated_at is
  E'@omit create,update';

COMMIT;
