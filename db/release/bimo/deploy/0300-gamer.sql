-- Deploy bimo:structure/gamer to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.gamer (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    contact_id bigint NULL,
    CONSTRAINT pk_gamer PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.gamer ADD CONSTRAINT fk_gamer_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.gamer ADD CONSTRAINT fk_gamer_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_gamer() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_gamer
    BEFORE INSERT OR UPDATE ON bimo.gamer
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_gamer();
  --||--


  --||--
  GRANT select ON TABLE bimo.gamer TO app_user;
  GRANT insert ON TABLE bimo.gamer TO app_user;
  GRANT update ON TABLE bimo.gamer TO app_user;
  GRANT delete ON TABLE bimo.gamer TO app_user;
  --||--
  alter table bimo.gamer enable row level security;
  --||--
  create policy select_gamer on bimo.gamer for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
