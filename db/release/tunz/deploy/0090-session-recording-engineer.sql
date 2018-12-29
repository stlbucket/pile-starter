-- Deploy tunz:structure/session_recording_engineer to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.session_recording_engineer (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    recording_session_id bigint NOT NULL,
    recording_engineer_id bigint NULL,
    note text,
    CONSTRAINT pk_session_recording_engineer PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.session_recording_engineer ADD CONSTRAINT fk_session_recording_engineer_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.session_recording_engineer ADD CONSTRAINT fk_session_recording_engineer_recording_engineer FOREIGN KEY ( recording_engineer_id ) REFERENCES tunz.recording_engineer( id );
  --||--
  ALTER TABLE tunz.session_recording_engineer ADD CONSTRAINT fk_session_recording_engineer_recording_session FOREIGN KEY ( recording_session_id ) REFERENCES tunz.recording_session( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_session_recording_engineer() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_session_recording_engineer
    BEFORE INSERT OR UPDATE ON tunz.session_recording_engineer
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_session_recording_engineer();
  --||--


  --||--
  GRANT select ON TABLE tunz.session_recording_engineer TO app_user;
  GRANT insert ON TABLE tunz.session_recording_engineer TO app_user;
  GRANT update ON TABLE tunz.session_recording_engineer TO app_user;
  GRANT delete ON TABLE tunz.session_recording_engineer TO app_user;
  --||--
  alter table tunz.session_recording_engineer enable row level security;
  --||--
  create policy select_session_recording_engineer on tunz.session_recording_engineer for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
