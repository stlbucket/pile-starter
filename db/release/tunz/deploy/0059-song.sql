-- Deploy tunz:structure/song to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.song (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    title text default 'untitled',
    CONSTRAINT pk_song PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.song ADD CONSTRAINT fk_song_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_song() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_song
    BEFORE INSERT OR UPDATE ON tunz.song
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_song();
  --||--


  --||--
  GRANT select ON TABLE tunz.song TO app_user;
  GRANT insert ON TABLE tunz.song TO app_user;
  GRANT update ON TABLE tunz.song TO app_user;
  GRANT delete ON TABLE tunz.song TO app_user;
  --||--
  alter table tunz.song enable row level security;
  --||--
  create policy select_song on tunz.song for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
