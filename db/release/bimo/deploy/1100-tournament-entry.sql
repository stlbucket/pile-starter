-- Deploy bimo:structure/tournament_entry to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.tournament_entry (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    tournament_id bigint NOT NULL,
    gamer_id bigint NOT NULL,
    CONSTRAINT pk_tournament_entry PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.tournament_entry ADD CONSTRAINT fk_tournament_entry_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.tournament_entry ADD CONSTRAINT fk_tournament_entry_gamer FOREIGN KEY ( gamer_id ) REFERENCES bimo.gamer( id );
  --||--
  ALTER TABLE bimo.tournament_entry ADD CONSTRAINT fk_tournament_entry_tournament FOREIGN KEY ( tournament_id ) REFERENCES bimo.tournament( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_tournament_entry() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_tournament_entry
    BEFORE INSERT OR UPDATE ON bimo.tournament_entry
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_tournament_entry();
  --||--


  --||--
  GRANT select ON TABLE bimo.tournament_entry TO app_user;
  GRANT insert ON TABLE bimo.tournament_entry TO app_user;
  GRANT update ON TABLE bimo.tournament_entry TO app_user;
  GRANT delete ON TABLE bimo.tournament_entry TO app_user;
  --||--
  alter table bimo.tournament_entry enable row level security;
  --||--
  create policy select_tournament_entry on bimo.tournament_entry for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
