-- Deploy bimo:structure/gamer_game_preferences to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.gamer_game_preferences (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    gamer_id bigint NOT NULL,
    game_id bigint NOT NULL,
    preferences jsonb NOT NULL DEFAULT '{}',
    CONSTRAINT pk_gamer_game_preferences PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.gamer_game_preferences ADD CONSTRAINT fk_gamer_game_preferences_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.gamer_game_preferences ADD CONSTRAINT fk_gamer_game_preferences_gamer FOREIGN KEY ( gamer_id ) REFERENCES bimo.gamer( id );
  --||--
  ALTER TABLE bimo.gamer_game_preferences ADD CONSTRAINT fk_gamer_game_preferences_game FOREIGN KEY ( game_id ) REFERENCES bimo.game( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_gamer_game_preferences() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_gamer_game_preferences
    BEFORE INSERT OR UPDATE ON bimo.gamer_game_preferences
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_gamer_game_preferences();
  --||--


  --||--
  GRANT select ON TABLE bimo.gamer_game_preferences TO app_user;
  GRANT insert ON TABLE bimo.gamer_game_preferences TO app_user;
  GRANT update ON TABLE bimo.gamer_game_preferences TO app_user;
  GRANT delete ON TABLE bimo.gamer_game_preferences TO app_user;
  --||--
  alter table bimo.gamer_game_preferences enable row level security;
  --||--
  create policy select_gamer_game_preferences on bimo.gamer_game_preferences for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
