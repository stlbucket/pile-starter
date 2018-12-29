-- Deploy tunz:structure/writing_credit to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.writing_credit (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    song_id bigint NOT NULL,
    songwriter_id bigint NOT NULL,
    note text,
    CONSTRAINT pk_writing_credit PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.writing_credit ADD CONSTRAINT fk_writing_credit_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.writing_credit ADD CONSTRAINT fk_writing_credit_song FOREIGN KEY ( song_id ) REFERENCES tunz.song( id );
  --||--
  ALTER TABLE tunz.writing_credit ADD CONSTRAINT fk_writng_credit_songwriter FOREIGN KEY ( songwriter_id ) REFERENCES tunz.songwriter( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_writing_credit() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_writing_credit
    BEFORE INSERT OR UPDATE ON tunz.writing_credit
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_writing_credit();
  --||--


  --||--
  GRANT select ON TABLE tunz.writing_credit TO app_user;
  GRANT insert ON TABLE tunz.writing_credit TO app_user;
  GRANT update ON TABLE tunz.writing_credit TO app_user;
  GRANT delete ON TABLE tunz.writing_credit TO app_user;
  --||--
  alter table tunz.writing_credit enable row level security;
  --||--
  create policy select_writing_credit on tunz.writing_credit for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
