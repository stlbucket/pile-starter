-- Deploy app:structure/application to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE app.application (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    external_id text,
    name text,
    key text unique not null,
    CONSTRAINT pk_application PRIMARY KEY (id)
  );

  --||--
  CREATE FUNCTION app.fn_timestamp_update_application() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_application
    BEFORE INSERT OR UPDATE ON app.application
    FOR EACH ROW
    EXECUTE PROCEDURE app.fn_timestamp_update_application();
  --||--


  --||--
  GRANT select ON TABLE app.application TO app_user;
  GRANT insert ON TABLE app.application TO app_super_admin;
  GRANT update ON TABLE app.application TO app_super_admin;
  GRANT delete ON TABLE app.application TO app_super_admin;
  --||--
  -- alter table app.application enable row level security;
  -- --||--
  -- create policy select_application on app.application for select
  --   using (app_tenant_id = auth_fn.current_app_tenant_id());

  -- comment on table app.application is E'@omit create,update,delete';

COMMIT;
