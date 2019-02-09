
-- Deploy bimo:structure/side to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE bimo.side (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    match_id bigint NOT NULL,
    CONSTRAINT pk_side PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE bimo.side ADD CONSTRAINT fk_side_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE bimo.side ADD CONSTRAINT fk_side_contact FOREIGN KEY ( match_id ) REFERENCES bimo.match( id );

  --||--
  CREATE FUNCTION bimo.fn_timestamp_update_side() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_side
    BEFORE INSERT OR UPDATE ON bimo.side
    FOR EACH ROW
    EXECUTE PROCEDURE bimo.fn_timestamp_update_side();
  --||--


  --||--
  GRANT select ON TABLE bimo.side TO app_user;
  GRANT insert ON TABLE bimo.side TO app_user;
  GRANT update ON TABLE bimo.side TO app_user;
  GRANT delete ON TABLE bimo.side TO app_user;
  --||--
  alter table bimo.side enable row level security;
  --||--
  create policy select_side on bimo.side for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
