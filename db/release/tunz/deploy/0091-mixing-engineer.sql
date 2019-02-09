-- Deploy tunz:structure/mixing_engineer to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.mixing_engineer (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    recording_session_id bigint NOT NULL,
    contact_id bigint NULL,
    note text,
    CONSTRAINT pk_mixing_engineer PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.mixing_engineer ADD CONSTRAINT fk_mixing_engineer_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.mixing_engineer ADD CONSTRAINT fk_mixing_engineer_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );
  --||--
  ALTER TABLE tunz.mixing_engineer ADD CONSTRAINT fk_mixing_engineer_recording_session FOREIGN KEY ( recording_session_id ) REFERENCES tunz.recording_session( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_mixing_engineer() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_mixing_engineer
    BEFORE INSERT OR UPDATE ON tunz.mixing_engineer
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_mixing_engineer();
  --||--


  --||--
  GRANT select ON TABLE tunz.mixing_engineer TO app_user;
  GRANT insert ON TABLE tunz.mixing_engineer TO app_user;
  GRANT update ON TABLE tunz.mixing_engineer TO app_user;
  GRANT delete ON TABLE tunz.mixing_engineer TO app_user;
  --||--
  alter table tunz.mixing_engineer enable row level security;
  --||--
  create policy select_mixing_engineer on tunz.mixing_engineer for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
