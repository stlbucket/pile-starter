-- Deploy bimo:structure/side_gamer to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.side_gamer (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    gamer_id bigint NOT NULL,
    side_id bigint NOT NULL,
    CONSTRAINT pk_side_gamer PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.side_gamer ADD CONSTRAINT fk_side_gamer_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.side_gamer ADD CONSTRAINT fk_side_gamer_gamer FOREIGN KEY ( gamer_id ) REFERENCES bimo.gamer( id );
  --||--
  ALTER TABLE bimo.side_gamer ADD CONSTRAINT fk_side_gamer_side FOREIGN KEY ( side_id ) REFERENCES bimo.side( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_side_gamer() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_side_gamer
    BEFORE INSERT OR UPDATE ON bimo.side_gamer
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_side_gamer();
  --||--


  --||--
  GRANT select ON TABLE bimo.side_gamer TO app_user;
  GRANT insert ON TABLE bimo.side_gamer TO app_user;
  GRANT update ON TABLE bimo.side_gamer TO app_user;
  GRANT delete ON TABLE bimo.side_gamer TO app_user;
  --||--
  alter table bimo.side_gamer enable row level security;
  --||--
  create policy select_side_gamer on bimo.side_gamer for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
