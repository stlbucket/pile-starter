-- Deploy tunz:structure/player to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.player (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    contact_id bigint NOT NULL,
    stage_name text,
    bio_blurb text,
    CONSTRAINT pk_player PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.player ADD CONSTRAINT fk_player_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.player ADD CONSTRAINT fk_player_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_player() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_player
    BEFORE INSERT OR UPDATE ON tunz.player
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_player();
  --||--


  --||--
  GRANT select ON TABLE tunz.player TO app_user;
  GRANT insert ON TABLE tunz.player TO app_user;
  GRANT update ON TABLE tunz.player TO app_user;
  GRANT delete ON TABLE tunz.player TO app_user;
  --||--
  alter table tunz.player enable row level security;
  --||--
  create policy select_player on tunz.player for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
