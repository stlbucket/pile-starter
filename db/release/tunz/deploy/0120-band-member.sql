-- Deploy tunz:structure/band_member to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.band_member (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    band_id bigint NOT NULL,
    contact_id bigint NOT NULL,
    note text,
    CONSTRAINT pk_band_member PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.band_member ADD CONSTRAINT fk_band_member_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.band_member ADD CONSTRAINT fk_band_member_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );
  --||--
  ALTER TABLE tunz.band_member ADD CONSTRAINT fk_band_member_band FOREIGN KEY ( band_id ) REFERENCES tunz.band( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_band_member() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_band_member
    BEFORE INSERT OR UPDATE ON tunz.band_member
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_band_member();
  --||--


  --||--
  GRANT select ON TABLE tunz.band_member TO app_user;
  GRANT insert ON TABLE tunz.band_member TO app_user;
  GRANT update ON TABLE tunz.band_member TO app_user;
  GRANT delete ON TABLE tunz.band_member TO app_user;
  --||--
  alter table tunz.band_member enable row level security;
  --||--
  create policy select_band_member on tunz.band_member for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
