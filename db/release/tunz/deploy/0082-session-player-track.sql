-- Deploy tunz:structure/session_player_track to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.session_player_track (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    session_player_id bigint NOT NULL,
    note text,
    track_id bigint NOT NULL,
    CONSTRAINT pk_session_player_track PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.session_player_track ADD CONSTRAINT fk_session_player_track_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.session_player_track ADD CONSTRAINT fk_session_player_track_session_player FOREIGN KEY ( session_player_id ) REFERENCES tunz.session_player( id );
  --||--
  ALTER TABLE tunz.session_player_track ADD CONSTRAINT fk_session_player_track_track FOREIGN KEY ( track_id ) REFERENCES tunz.track( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_session_player_track() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_session_player_track
    BEFORE INSERT OR UPDATE ON tunz.session_player_track
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_session_player_track();
  --||--


  --||--
  GRANT select ON TABLE tunz.session_player_track TO app_user;
  GRANT insert ON TABLE tunz.session_player_track TO app_user;
  GRANT update ON TABLE tunz.session_player_track TO app_user;
  GRANT delete ON TABLE tunz.session_player_track TO app_user;
  --||--
  alter table tunz.session_player_track enable row level security;
  --||--
  create policy select_session_player_track on tunz.session_player_track for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
