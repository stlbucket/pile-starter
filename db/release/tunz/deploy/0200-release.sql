-- Deploy tunz:structure/release to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.release (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    title text default 'untitled',
    one_sentence text,
    urls text[],
    isrc text,
    bar_code text,
    description text,
    recording_id bigint NOT NULL,
    copyright text,
    publishing_group text,
    CONSTRAINT pk_release PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.release ADD CONSTRAINT fk_release_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.release ADD CONSTRAINT fk_release_recording FOREIGN KEY ( recording_id ) REFERENCES tunz.recording( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_release() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_release
    BEFORE INSERT OR UPDATE ON tunz.release
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_release();
  --||--


  --||--
  GRANT select ON TABLE tunz.release TO app_user;
  GRANT insert ON TABLE tunz.release TO app_user;
  GRANT update ON TABLE tunz.release TO app_user;
  GRANT delete ON TABLE tunz.release TO app_user;
  --||--
  alter table tunz.release enable row level security;
  --||--
  create policy select_release on tunz.release for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
