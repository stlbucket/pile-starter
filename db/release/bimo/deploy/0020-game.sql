-- Deploy bimo:structure/game to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.game (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    organization_id bigint NULL,
    name text,
    CONSTRAINT pk_game PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.game ADD CONSTRAINT fk_game_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.game ADD CONSTRAINT fk_game_organization FOREIGN KEY ( organization_id ) REFERENCES org.organization( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_game() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_game
    BEFORE INSERT OR UPDATE ON bimo.game
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_game();
  --||--


  --||--
  GRANT select ON TABLE bimo.game TO app_user;
  GRANT insert ON TABLE bimo.game TO app_user;
  GRANT update ON TABLE bimo.game TO app_user;
  GRANT delete ON TABLE bimo.game TO app_user;
  --||--
  alter table bimo.game enable row level security;
  --||--
  create policy select_game on bimo.game for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
