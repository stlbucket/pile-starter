-- Deploy tunz:structure/recording to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.recording (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    song_id bigint NULL,
    title text default 'untitled',
    other_titles text[],
    key text,
    description text,
    bpm integer,
    lyrics text,
    CONSTRAINT pk_recording PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.recording ADD CONSTRAINT fk_recording_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.recording ADD CONSTRAINT fk_recording_song FOREIGN KEY ( song_id ) REFERENCES tunz.song( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_recording() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_recording
    BEFORE INSERT OR UPDATE ON tunz.recording
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_recording();
  --||--


  --||--
  GRANT select ON TABLE tunz.recording TO app_user;
  GRANT insert ON TABLE tunz.recording TO app_user;
  GRANT update ON TABLE tunz.recording TO app_user;
  GRANT delete ON TABLE tunz.recording TO app_user;
  --||--
  alter table tunz.recording enable row level security;
  --||--
  create policy select_recording on tunz.recording for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
