-- Deploy tunz:structure/recording_session to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.recording_session (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    session_start timestamp NULL,
    session_end timestamp NULL,
    name text,
    recording_id bigint NOT NULL,
    recording_studio_id bigint NULL,
    CONSTRAINT pk_recording_session PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.recording_session ADD CONSTRAINT fk_recording_session_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.recording_session ADD CONSTRAINT fk_recording_session_recording FOREIGN KEY ( recording_id ) REFERENCES tunz.recording( id );
  --||--
  ALTER TABLE tunz.recording_session ADD CONSTRAINT fk_recording_session_recording_studio FOREIGN KEY ( recording_studio_id ) REFERENCES tunz.recording_studio( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_recording_session() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_recording_session
    BEFORE INSERT OR UPDATE ON tunz.recording_session
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_recording_session();
  --||--


  --||--
  GRANT select ON TABLE tunz.recording_session TO app_user;
  GRANT insert ON TABLE tunz.recording_session TO app_user;
  GRANT update ON TABLE tunz.recording_session TO app_user;
  GRANT delete ON TABLE tunz.recording_session TO app_user;
  --||--
  alter table tunz.recording_session enable row level security;
  --||--
  create policy select_recording_session on tunz.recording_session for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
