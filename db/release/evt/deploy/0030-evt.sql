-- Deploy evt:structure/evt to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE evt.evt (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_by_app_user_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    name text NOT NULL,
    params jsonb NOT NULL DEFAULT '{}',
    outcomes jsonb NULL,
    result evt.evt_processing_result NOT NULL,
    CONSTRAINT pk_evt PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE evt.evt ADD CONSTRAINT fk_evt_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE evt.evt ADD CONSTRAINT fk_evt_created_by FOREIGN KEY ( created_by_app_user_id ) REFERENCES auth.app_user( id );

  --||--
  CREATE FUNCTION evt.fn_timestamp_update_evt() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_evt
    BEFORE INSERT OR UPDATE ON evt.evt
    FOR EACH ROW
    EXECUTE PROCEDURE evt.fn_timestamp_update_evt();
  --||--

  --||--
  GRANT select ON TABLE evt.evt TO app_user;
  GRANT insert ON TABLE evt.evt TO app_user;
  GRANT update ON TABLE evt.evt TO app_user;
  GRANT delete ON TABLE evt.evt TO app_user;
  --||--
  alter table evt.evt enable row level security;
  --||--
  create policy select_evt on evt.evt for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
