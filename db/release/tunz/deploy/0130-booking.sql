-- Deploy tunz:structure/booking to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.booking (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    band_id bigint NOT NULL,
    show_id bigint NOT NULL,
    note text,
    performance_order integer,
    CONSTRAINT pk_booking PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.booking ADD CONSTRAINT fk_booking_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.booking ADD CONSTRAINT fk_booking_show FOREIGN KEY ( show_id ) REFERENCES tunz.show( id );
  --||--
  ALTER TABLE tunz.booking ADD CONSTRAINT fk_booking_band FOREIGN KEY ( band_id ) REFERENCES tunz.band( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_booking() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_booking
    BEFORE INSERT OR UPDATE ON tunz.booking
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_booking();
  --||--


  --||--
  GRANT select ON TABLE tunz.booking TO app_user;
  GRANT insert ON TABLE tunz.booking TO app_user;
  GRANT update ON TABLE tunz.booking TO app_user;
  GRANT delete ON TABLE tunz.booking TO app_user;
  --||--
  alter table tunz.booking enable row level security;
  --||--
  create policy select_booking on tunz.booking for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
