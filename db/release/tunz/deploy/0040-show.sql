-- Deploy tunz:structure/show to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.show (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    venue_id bigint not null,
    show_date date,
    door_time time,
    CONSTRAINT pk_show PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.show ADD CONSTRAINT fk_show_venue FOREIGN KEY ( venue_id ) REFERENCES tunz.venue( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_show() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_show
    BEFORE INSERT OR UPDATE ON tunz.show
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_show();
  --||--


  --||--
  GRANT select ON TABLE tunz.show TO app_user;
  GRANT insert ON TABLE tunz.show TO app_user;
  GRANT update ON TABLE tunz.show TO app_user;
  GRANT delete ON TABLE tunz.show TO app_user;
  --||--
  -- alter table tunz.show enable row level security;
  --||--
  -- create policy select_show on tunz.show for select
  --   using (app_tenant_id = auth_fn.current_app_tenant_id());

COMMIT;
