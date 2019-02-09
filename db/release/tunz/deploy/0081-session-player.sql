-- Deploy tunz:structure/session_player to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.session_player (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    recording_session_id bigint NOT NULL,
    contact_id bigint NOT NULL,
    note text,
    CONSTRAINT pk_session_player PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.session_player ADD CONSTRAINT fk_session_player_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.session_player ADD CONSTRAINT fk_session_player_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );
  --||--
  ALTER TABLE tunz.session_player ADD CONSTRAINT fk_session_player_recording_session FOREIGN KEY ( recording_session_id ) REFERENCES tunz.recording_session( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_session_player() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_session_player
    BEFORE INSERT OR UPDATE ON tunz.session_player
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_session_player();
  --||--


  --||--
  GRANT select ON TABLE tunz.session_player TO app_user;
  GRANT insert ON TABLE tunz.session_player TO app_user;
  GRANT update ON TABLE tunz.session_player TO app_user;
  GRANT delete ON TABLE tunz.session_player TO app_user;
  --||--
  alter table tunz.session_player enable row level security;
  --||--
  create policy select_session_player on tunz.session_player for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
