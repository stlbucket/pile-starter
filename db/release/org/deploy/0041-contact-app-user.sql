
-- Deploy org:structure/contact_app_user to pg
-- requires: structure/organization

BEGIN;

  CREATE TABLE org.contact_app_user (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    contact_id bigint NOT NULL unique,
    app_user_id bigint NOT NULL unique,
    username text NOT NULL check (username <> '') unique,
    CONSTRAINT pk_contact_app_user PRIMARY KEY (id)
  );
  ALTER TABLE org.contact_app_user ADD CONSTRAINT fk_contact_app_user_app_user FOREIGN KEY ( app_user_id ) REFERENCES auth.app_user( id );
  --||--
  ALTER TABLE org.contact_app_user ADD CONSTRAINT fk_contact_app_user_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE org.contact_app_user ADD CONSTRAINT fk_contact_app_user_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_contact_app_user() RETURNS trigger AS $$
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
  CREATE TRIGGER tg_timestamp_update_contact_app_user
    BEFORE INSERT OR UPDATE ON org.contact_app_user
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_contact_app_user();
  --||--


  --||--
  GRANT select ON TABLE org.contact_app_user TO app_user;
  GRANT insert ON TABLE org.contact_app_user TO app_user;
  GRANT update ON TABLE org.contact_app_user TO app_user;
  GRANT delete ON TABLE org.contact_app_user TO app_user;
  --||--
  alter table org.contact_app_user enable row level security;
  --||--
  create policy all_contact_app_user on org.contact_app_user for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_contact_app_user on org.contact_app_user for all to app_super_admin
  using (1 = 1);

  comment on column org.contact_app_user.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.contact_app_user.id is
  E'@omit create';
  comment on column org.contact_app_user.created_at is
  E'@omit create,update';
  comment on column org.contact_app_user.updated_at is
  E'@omit create,update';

COMMIT;
