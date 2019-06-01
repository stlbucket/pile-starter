-- Deploy org:structure/affiliation to pg
-- requires: structure/organization

BEGIN;

  CREATE TABLE org.affiliation (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    name text,
    external_id text,
    CONSTRAINT pk_affiliation PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE org.affiliation ADD CONSTRAINT fk_affiliation_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_affiliation() RETURNS trigger AS $$
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
  CREATE TRIGGER tg_timestamp_update_affiliation
    BEFORE INSERT OR UPDATE ON org.affiliation
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_affiliation();
  --||--


  --||--
  GRANT select ON TABLE org.affiliation TO app_user;
  GRANT insert ON TABLE org.affiliation TO app_user;
  GRANT update ON TABLE org.affiliation TO app_user;
  GRANT delete ON TABLE org.affiliation TO app_user;
  --||--
  alter table org.affiliation enable row level security;
  --||--
  create policy all_affiliation_app_user on org.affiliation for all to app_user  -- sql action could change according to your needs
  using (app_tenant_id = auth_fn.current_app_tenant_id());  -- this function could be replaced entirely or on individual policies as needed

  create policy super_aadmin_affiliation_app_user on org.affiliation for all to app_super_admin
  using (1 = 1);


  comment on column org.affiliation.app_tenant_id is
  E'@omit create'; -- id is always set by the db.  this might change in an event-sourcing scenario
  comment on column org.affiliation.id is
  E'@omit create';
  comment on column org.affiliation.created_at is
  E'@omit create,update';
  comment on column org.affiliation.updated_at is
  E'@omit create,update';

COMMIT;
