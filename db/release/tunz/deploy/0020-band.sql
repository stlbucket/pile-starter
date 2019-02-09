-- Deploy tunz:structure/band to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.band (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    organization_id bigint NOT NULL UNIQUE,
    CONSTRAINT pk_band PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.band ADD CONSTRAINT fk_band_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.band ADD CONSTRAINT fk_band_organization FOREIGN KEY ( organization_id ) REFERENCES org.organization( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_band() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_band
    BEFORE INSERT OR UPDATE ON tunz.band
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_band();
  --||--


  --||--
  GRANT select ON TABLE tunz.band TO app_user;
  GRANT insert ON TABLE tunz.band TO app_user;
  GRANT update ON TABLE tunz.band TO app_user;
  GRANT delete ON TABLE tunz.band TO app_user;
  --||--
  alter table tunz.band enable row level security;
  --||--
  create policy select_band on tunz.band for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
