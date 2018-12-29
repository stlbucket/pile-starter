-- Deploy msg:0040-message_delivery to pg
-- requires: 0010-schema

BEGIN;

  CREATE TABLE msg.message_delivery (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    delivered_at timestamp NULL,
    acknowledged_at timestamp NULL,
    answered_at timestamp NULL,
    message_id bigint NOT NULL,
    to_contact_id bigint NOT NULL,
    delivery_status msg.message_delivery_status NOT NULL DEFAULT 'Requested',
    delivery_method msg.message_delivery_method NOT NULL DEFAULT 'IN_APP',
    CONSTRAINT pk_message_delivery PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE msg.message_delivery ADD CONSTRAINT fk_message_delivery_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE msg.message_delivery ADD CONSTRAINT fk_message_delivery_message FOREIGN KEY ( message_id ) REFERENCES msg.message( id );
  --||--
  ALTER TABLE msg.message_delivery ADD CONSTRAINT fk_message_delivery_to_contact FOREIGN KEY ( to_contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION msg.fn_timestamp_update_message_delivery() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_message_delivery
    BEFORE INSERT OR UPDATE ON msg.message_delivery
    FOR EACH ROW
    EXECUTE PROCEDURE msg.fn_timestamp_update_message_delivery();
  --||--

  --||--
  GRANT select ON TABLE msg.message_delivery TO app_user;
  GRANT insert ON TABLE msg.message_delivery TO app_user;
  GRANT update ON TABLE msg.message_delivery TO app_user;
  GRANT delete ON TABLE msg.message_delivery TO app_user;
  --||--
  alter table msg.message_delivery enable row level security;
  --||--
  create policy select_message_delivery on msg.message_delivery for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
