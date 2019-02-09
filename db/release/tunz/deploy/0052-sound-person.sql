-- Deploy tunz:structure/sound_person to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.sound_person (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    show_id bigint NOT NULL,
    contact_id bigint NOT NULL,
    note text,
    CONSTRAINT pk_sound_person PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.sound_person ADD CONSTRAINT fk_sound_person_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.sound_person ADD CONSTRAINT fk_sound_person_show FOREIGN KEY ( show_id ) REFERENCES tunz.show( id );
  --||--
  ALTER TABLE tunz.sound_person ADD CONSTRAINT fk_sound_person_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_sound_person() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_sound_person
    BEFORE INSERT OR UPDATE ON tunz.sound_person
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_sound_person();
  --||--


  --||--
  GRANT select ON TABLE tunz.sound_person TO app_user;
  GRANT insert ON TABLE tunz.sound_person TO app_user;
  GRANT update ON TABLE tunz.sound_person TO app_user;
  GRANT delete ON TABLE tunz.sound_person TO app_user;
  --||--
  alter table tunz.sound_person enable row level security;
  --||--
  create policy select_sound_person on tunz.sound_person for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
