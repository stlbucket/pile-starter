-- Deploy bimo:structure/tournament_match to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.tournament_match (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    tournament_id bigint NOT NULL,
    match_id bigint NOT NULL,
    CONSTRAINT pk_tournament_match PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.tournament_match ADD CONSTRAINT fk_tournament_match_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.tournament_match ADD CONSTRAINT fk_tournament_match_match FOREIGN KEY ( match_id ) REFERENCES bimo.match( id );
  --||--
  ALTER TABLE bimo.tournament_match ADD CONSTRAINT fk_tournament_match_tournament FOREIGN KEY ( tournament_id ) REFERENCES bimo.tournament( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_tournament_match() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_tournament_match
    BEFORE INSERT OR UPDATE ON bimo.tournament_match
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_tournament_match();
  --||--


  --||--
  GRANT select ON TABLE bimo.tournament_match TO app_user;
  GRANT insert ON TABLE bimo.tournament_match TO app_user;
  GRANT update ON TABLE bimo.tournament_match TO app_user;
  GRANT delete ON TABLE bimo.tournament_match TO app_user;
  --||--
  alter table bimo.tournament_match enable row level security;
  --||--
  create policy select_tournament_match on bimo.tournament_match for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
