-- Deploy tunz:structure/session_producer to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.session_producer (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    recording_session_id bigint NOT NULL,
    producer_id bigint NULL,
    note text,
    CONSTRAINT pk_session_producer PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.session_producer ADD CONSTRAINT fk_session_producer_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.session_producer ADD CONSTRAINT fk_session_producer_producer FOREIGN KEY ( producer_id ) REFERENCES tunz.producer( id );
  --||--
  ALTER TABLE tunz.session_producer ADD CONSTRAINT fk_session_producer_recording_session FOREIGN KEY ( recording_session_id ) REFERENCES tunz.recording_session( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_session_producer() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_session_producer
    BEFORE INSERT OR UPDATE ON tunz.session_producer
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_session_producer();
  --||--


  --||--
  GRANT select ON TABLE tunz.session_producer TO app_user;
  GRANT insert ON TABLE tunz.session_producer TO app_user;
  GRANT update ON TABLE tunz.session_producer TO app_user;
  GRANT delete ON TABLE tunz.session_producer TO app_user;
  --||--
  alter table tunz.session_producer enable row level security;
  --||--
  create policy select_session_producer on tunz.session_producer for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
