-- Deploy evt:structure/evt to pg
-- requires: structure/schema

BEGIN;
  CREATE TABLE evt.evt (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_by_app_user_id bigint NOT NULL,
    captured_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    idempotency_hash text,
    external_occurred_at timestamp NULL,
    external_tx_id text NULL,
    app_tenant_id bigint NOT NULL,
    entity_id_internal bigint NULL,
    entity_id_external text,
    evt_type text not null,
    params jsonb NOT NULL DEFAULT '{}',
    outcomes jsonb NULL,
    -- result evt.evt_processing_result NOT NULL,
    result text not null,
    CONSTRAINT pk_evt PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE evt.evt ADD CONSTRAINT fk_evt_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE evt.evt ADD CONSTRAINT fk_evt_created_by FOREIGN KEY ( created_by_app_user_id ) REFERENCES auth.app_user( id );
  --||--
  ALTER TABLE evt.evt ADD CONSTRAINT fk_evt_evt_processing_result FOREIGN KEY ( result ) REFERENCES evt.evt_processing_result( id );
  --||--
  ALTER TABLE evt.evt ADD CONSTRAINT fk_evt_type FOREIGN KEY ( evt_type ) REFERENCES evt.evt_type( id );

  --||--
  CREATE FUNCTION evt.fn_timestamp_update_evt() RETURNS trigger AS $$
  BEGIN
    if NEW.id is null then NEW.id = shard_1.id_generator(); end if;
    -- if NEW.idempotent_id is null or NEW.idempotent_id = '' then NEW.idempotent_id = NEW.id; end if;
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

COMMIT;
