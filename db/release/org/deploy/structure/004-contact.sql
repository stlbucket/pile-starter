-- Deploy org:structure/contact to pg
-- requires: structure/organization

BEGIN;

  CREATE TABLE org.contact (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    organization_id bigint NULL,
    location_id bigint NULL,
    app_user_id bigint NULL,
    external_id text,
    first_name text,
    last_name text,
    email text,
    cell_phone text,
    office_phone text,
    title text,
    nickname text,
    CONSTRAINT uq_contact_app_tenant_and_email UNIQUE (app_tenant_id, email),
    CONSTRAINT uq_contact_app_tenant_and_external_id UNIQUE (app_tenant_id, external_id),
    CONSTRAINT pk_contact PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE org.contact ADD CONSTRAINT fk_contact_organization FOREIGN KEY ( organization_id ) REFERENCES org.organization( id );
  --||--
  ALTER TABLE org.contact ADD CONSTRAINT fk_contact_location FOREIGN KEY ( location_id ) REFERENCES org.location( id );
  --||--
  ALTER TABLE org.contact ADD CONSTRAINT fk_contact_app_user FOREIGN KEY ( app_user_id ) REFERENCES auth.app_user( id );
  --||--
  ALTER TABLE org.contact ADD CONSTRAINT fk_contact_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION org.fn_timestamp_update_contact() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_contact
    BEFORE INSERT OR UPDATE ON org.contact
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_contact();
  --||--


  --||--
  GRANT select ON TABLE org.contact TO app_user;
  GRANT insert ON TABLE org.contact TO app_user;
  GRANT update ON TABLE org.contact TO app_user;
  GRANT delete ON TABLE org.contact TO app_user;
  --||--
  alter table org.contact enable row level security;
  --||--
  create policy select_contact on org.contact for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
