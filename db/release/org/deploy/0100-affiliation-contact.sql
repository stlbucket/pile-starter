-- Deploy org:structure/affiliation_contact to pg
-- requires: structure/contact

BEGIN;

  CREATE TABLE org.affiliation_contact (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    contact_id bigint not null,
    affiliation_id bigint not null,
    CONSTRAINT pk_affiliation_contact PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE org.affiliation_contact ADD CONSTRAINT fk_affiliation_contact_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );
  --||--
  ALTER TABLE org.affiliation_contact ADD CONSTRAINT fk_affiliation_contact_affiliation FOREIGN KEY ( affiliation_id ) REFERENCES org.affiliation( id );
  --||--
  ALTER TABLE org.affiliation_contact ADD CONSTRAINT fk_affiliation_contact_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_affiliation_contact() RETURNS trigger AS $$
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
  CREATE TRIGGER tg_timestamp_update_affiliation_contact
    BEFORE INSERT OR UPDATE ON org.affiliation_contact
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_affiliation_contact();
  --||--


  --||--
  GRANT select ON TABLE org.affiliation_contact TO app_user;
  GRANT insert ON TABLE org.affiliation_contact TO app_user;
  GRANT update ON TABLE org.affiliation_contact TO app_user;
  GRANT delete ON TABLE org.affiliation_contact TO app_user;
  --||--
  alter table org.affiliation_contact enable row level security;
  --||--
  create policy all_affiliation_contact_app_user on org.affiliation_contact for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_affiliation_contact_app_user on org.affiliation_contact for all to app_super_admin
  using (1 = 1);


  comment on column org.affiliation_contact.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.affiliation_contact.id is
  E'@omit create';
  comment on column org.affiliation_contact.created_at is
  E'@omit create,update';
  comment on column org.affiliation_contact.updated_at is
  E'@omit create,update';

COMMIT;
