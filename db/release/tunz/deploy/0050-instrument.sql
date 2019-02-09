-- Deploy tunz:structure/instrument to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.instrument (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    name text,
    CONSTRAINT pk_instrument PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.instrument ADD CONSTRAINT fk_instrument_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_instrument() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_instrument
    BEFORE INSERT OR UPDATE ON tunz.instrument
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_instrument();
  --||--


  --||--
  GRANT select ON TABLE tunz.instrument TO app_user;
  GRANT insert ON TABLE tunz.instrument TO app_user;
  GRANT update ON TABLE tunz.instrument TO app_user;
  GRANT delete ON TABLE tunz.instrument TO app_user;
  --||--
  alter table tunz.instrument enable row level security;
  --||--
  create policy select_instrument on tunz.instrument for select
    using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
