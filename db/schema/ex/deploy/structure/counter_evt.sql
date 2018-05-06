-- Deploy ex:structure/counter_evt to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE ex.counter_evt (
    id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
    app_tenant_id uuid UNIQUE NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    current_value integer NOT NULL DEFAULT 0,
    error_threshold integer NOT NULL DEFAULT 5,
    CONSTRAINT pk_counter_evt PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE ex.counter_evt ADD CONSTRAINT fk_counter_evt_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );

  --||--
  CREATE FUNCTION ex.fn_timestamp_update_counter_evt() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_counter_evt
    BEFORE INSERT OR UPDATE ON ex.counter_evt
    FOR EACH ROW
    EXECUTE PROCEDURE ex.fn_timestamp_update_counter_evt();
  --||--


  --||--
  GRANT select ON TABLE ex.counter_evt TO app_user;
  GRANT insert ON TABLE ex.counter_evt TO app_user;
  GRANT update ON TABLE ex.counter_evt TO app_user;
  GRANT delete ON TABLE ex.counter_evt TO app_user;

  --||--
  alter table ex.counter_evt enable row level security;
  --||--
  create policy select_counter_evt on ex.counter_evt for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);


  --||--
  CREATE FUNCTION ex.fn_init_tenant_counter_evt() RETURNS trigger AS $$
  BEGIN
    INSERT INTO ex.counter_evt(
      app_tenant_id
    )
    SELECT NEW.id;

    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_init_tenant_counter_evt
    AFTER INSERT ON auth.app_tenant
    FOR EACH ROW
    EXECUTE PROCEDURE ex.fn_init_tenant_counter_evt();
  --||--

COMMIT;
