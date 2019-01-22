-- Deploy bimo:structure/tournament to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.tournament (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL,
    game_id bigint NOT NULL,
    name text,
    CONSTRAINT pk_tournament PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.tournament ADD CONSTRAINT fk_tournament_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.tournament ADD CONSTRAINT fk_tournament_game FOREIGN KEY ( game_id ) REFERENCES bimo.game( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_tournament() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_tournament
    BEFORE INSERT OR UPDATE ON bimo.tournament
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_tournament();
  --||--


  --||--
  GRANT select ON TABLE bimo.tournament TO app_user;
  GRANT insert ON TABLE bimo.tournament TO app_user;
  GRANT update ON TABLE bimo.tournament TO app_user;
  GRANT delete ON TABLE bimo.tournament TO app_user;
  --||--
  alter table bimo.tournament enable row level security;
  --||--
  create policy select_tournament on bimo.tournament for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
