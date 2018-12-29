-- Deploy tunz:structure/track to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.track (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    recording_session_id bigint NOT NULL,
    note text,
    instrument_id bigint NOT NULL,
    status tunz.track_status NOT NULL DEFAULT 'Recorded',
    CONSTRAINT pk_track PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.track ADD CONSTRAINT fk_track_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.track ADD CONSTRAINT fk_track_recording_session FOREIGN KEY ( recording_session_id ) REFERENCES tunz.recording_session( id );
  --||--
  ALTER TABLE tunz.track ADD CONSTRAINT fk_track_instrument FOREIGN KEY ( instrument_id ) REFERENCES tunz.instrument( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_track() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_track
    BEFORE INSERT OR UPDATE ON tunz.track
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_track();
  --||--


  --||--
  GRANT select ON TABLE tunz.track TO app_user;
  GRANT insert ON TABLE tunz.track TO app_user;
  GRANT update ON TABLE tunz.track TO app_user;
  GRANT delete ON TABLE tunz.track TO app_user;
  --||--
  alter table tunz.track enable row level security;
  --||--
  create policy select_track on tunz.track for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
