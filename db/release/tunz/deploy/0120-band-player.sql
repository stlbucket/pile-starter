-- Deploy tunz:structure/band_player to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.band_player (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    band_id bigint NOT NULL,
    player_id bigint NOT NULL,
    note text,
    instrument_id bigint NOT NULL,
    CONSTRAINT pk_band_player PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.band_player ADD CONSTRAINT fk_band_player_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.band_player ADD CONSTRAINT fk_band_player_player FOREIGN KEY ( player_id ) REFERENCES tunz.player( id );
  --||--
  ALTER TABLE tunz.band_player ADD CONSTRAINT fk_band_player_band FOREIGN KEY ( band_id ) REFERENCES tunz.band( id );
  --||--
  ALTER TABLE tunz.band_player ADD CONSTRAINT fk_band_player_instrument FOREIGN KEY ( instrument_id ) REFERENCES tunz.instrument( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_band_player() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_band_player
    BEFORE INSERT OR UPDATE ON tunz.band_player
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_band_player();
  --||--


  --||--
  GRANT select ON TABLE tunz.band_player TO app_user;
  GRANT insert ON TABLE tunz.band_player TO app_user;
  GRANT update ON TABLE tunz.band_player TO app_user;
  GRANT delete ON TABLE tunz.band_player TO app_user;
  --||--
  alter table tunz.band_player enable row level security;
  --||--
  create policy select_band_player on tunz.band_player for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
