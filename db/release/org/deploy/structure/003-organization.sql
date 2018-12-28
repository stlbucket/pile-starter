-- Deploy org:structure/organization to pg
-- requires: structure/location

BEGIN;

  CREATE TABLE org.organization (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    actual_app_tenant_id bigint NULL UNIQUE,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    name text,
    location_id bigint NULL,
    CONSTRAINT uq_organization_app_tenant_and_name UNIQUE (app_tenant_id, name),
    CONSTRAINT pk_organization PRIMARY KEY (id)
  );

  --||--
  ALTER TABLE org.organization ADD CONSTRAINT fk_organization_location FOREIGN KEY ( location_id ) REFERENCES org.location( id );
  --||--
  ALTER TABLE org.organization ADD CONSTRAINT fk_organization_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE org.organization ADD CONSTRAINT fk_organization_actual_app_tenant FOREIGN KEY ( actual_app_tenant_id ) REFERENCES auth.app_tenant( id );


  --||--
  CREATE FUNCTION org.fn_timestamp_update_organization() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_organization
    BEFORE INSERT OR UPDATE ON org.organization
    FOR EACH ROW
    EXECUTE PROCEDURE org.fn_timestamp_update_organization();



  --||--
  GRANT select ON TABLE org.organization TO app_user;
  GRANT insert ON TABLE org.organization TO app_user;
  GRANT update ON TABLE org.organization TO app_user;
  GRANT delete ON TABLE org.organization TO app_user;
  --||--
  alter table org.organization enable row level security;
  --||--
  create policy select_organization on org.organization for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

  comment on table org.organization is E'@omit create,update,delete';

COMMIT;
