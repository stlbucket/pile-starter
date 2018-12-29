-- Deploy message:structure/message to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE msg.message (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_by_app_user_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    subject_line text NOT NULL,
    content text NOT NULL,
    CONSTRAINT pk_message PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE msg.message ADD CONSTRAINT fk_message_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE msg.message ADD CONSTRAINT fk_message_created_by FOREIGN KEY ( created_by_app_user_id ) REFERENCES auth.app_user( id );

  --||--
  CREATE FUNCTION msg.fn_timestamp_update_message() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_message
    BEFORE INSERT OR UPDATE ON msg.message
    FOR EACH ROW
    EXECUTE PROCEDURE msg.fn_timestamp_update_message();
  --||--

  --||--
  GRANT select ON TABLE msg.message TO app_user;
  GRANT insert ON TABLE msg.message TO app_user;
  GRANT update ON TABLE msg.message TO app_user;
  GRANT delete ON TABLE msg.message TO app_user;
  --||--
  alter table msg.message enable row level security;
  --||--
  create policy select_message on msg.message for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
