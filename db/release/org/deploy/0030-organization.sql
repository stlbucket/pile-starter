-- Deploy org:structure/organization to pg
-- requires: structure/location

begin;

  -- basic structure
  create table org.organization (
    id bigint unique not null DEFAULT shard_1.id_generator(),
    app_tenant_id bigint not null, -- the auth.app_tenant that owns this database record
    actual_app_tenant_id bigint null unique,  --  if this organization is an app_tenant, this field will reference that record
    created_at timestamp not null DEFAULT current_timestamp,  -- this value will never change once it is set
    updated_at timestamp not null,  -- a insert/update trigger sets this value
    external_id text, -- a generic-use field when integrating with other systems
    name text not null CHECK (name <> ''), -- the primary name of this organization
    location_id bigint null, -- optional foreign-key to an organization's location record
    constraint uq_app_tenant_external_id unique (app_tenant_id, external_id),
    constraint pk_organization primary key (id)
  );
  -- end basic structure

  -- foreign keys
  --||--
  alter table org.organization add constraint fk_organization_location foreign key ( location_id ) references org.location( id );
  --||--
  alter table org.organization add constraint fk_organization_app_tenant foreign key ( app_tenant_id ) references auth.app_tenant( id );
  --||--
  alter table org.organization add constraint fk_organization_actual_app_tenant foreign key ( actual_app_tenant_id ) references auth.app_tenant( id );
  -- end foreign keys


  -- before insert/update trigger
  
  -- the trigger function
  create or replace function org.fn_timestamp_update_organization() returns trigger AS $$
  begin
    if NEW.app_tenant_id is null then 
      -- only users with 'SuperAdmin' permission_key will be able to arbitrarily set this value
      -- rls policy (below) will prevent users from specifying an alternate app_tenant_id
      NEW.app_tenant_id := auth_fn.current_app_tenant_id();
      NEW.app_tenant_id := auth_fn.current_app_tenant_id();
    end if;

    NEW.updated_at = current_timestamp;

    return NEW;
  end; $$ language plpgsql;


  -- the trigger
  create trigger tg_timestamp_update_organization
    before insert or update on org.organization
    for each row
    execute procedure org.fn_timestamp_update_organization();

  -- end before insert/update trigger



  -- security
  -- these settings will vary depending on your application, and should be actively managed
  -- for most entities, access to app_user role for all CRUD operations will be appropriate
  grant select ON table org.organization TO app_user;
  grant insert ON table org.organization TO app_user;
  grant update ON table org.organization TO app_user;
  grant delete ON table org.organization TO app_user;

  -- enable row-level security
  alter table org.organization enable row level security;
  -- define a security policy.  your application may require more complexity.
  create policy all_organization on org.organization for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_organization on org.organization for all to app_super_admin
  using (1 = 1);


  -- postgraphile smart comments to configure the API:   https://www.graphile.org/postgraphile/smart-comments/
  comment on column org.organization.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.organization.id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.organization.created_at is
  E'@omit create,update'; -- created_at is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.organization.updated_at is
  E'@omit create,update'; -- updated_at is always set by the db.  this might change in an event-sourcing scenario

  -- comment on table org.organization is E'@omit create,update,delete';  -- this would be used if we want to disallow mutations
  -- end smart comments

COMMIT;
