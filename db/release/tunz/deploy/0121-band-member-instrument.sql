-- Deploy tunz:structure/band_member_instrument to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.band_member_instrument (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    band_member_id bigint NOT NULL,
    note text,
    instrument_id bigint NOT NULL,
    CONSTRAINT pk_band_member_instrument PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.band_member_instrument ADD CONSTRAINT fk_band_member_instrument_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.band_member_instrument ADD CONSTRAINT fk_band_member_instrument_band_member FOREIGN KEY ( band_member_id ) REFERENCES tunz.band_member( id );
  --||--
  ALTER TABLE tunz.band_member_instrument ADD CONSTRAINT fk_band_member_instrument_instrument FOREIGN KEY ( instrument_id ) REFERENCES tunz.instrument( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_band_member_instrument() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_band_member_instrument
    BEFORE INSERT OR UPDATE ON tunz.band_member_instrument
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_band_member_instrument();
  --||--


  --||--
  GRANT select ON TABLE tunz.band_member_instrument TO app_user;
  GRANT insert ON TABLE tunz.band_member_instrument TO app_user;
  GRANT update ON TABLE tunz.band_member_instrument TO app_user;
  GRANT delete ON TABLE tunz.band_member_instrument TO app_user;
  --||--
  alter table tunz.band_member_instrument enable row level security;
  --||--
  create policy select_band_member_instrument on tunz.band_member_instrument for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
