-- Deploy auth:0080-permission to pg
-- requires: 0070-token

BEGIN;

  CREATE TABLE auth.permission (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    key text,
    CONSTRAINT pk_permission PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE auth.permission ADD CONSTRAINT permission_key_check CHECK (char_length(key) >= 4);
  --||--
  GRANT select ON TABLE auth.permission TO app_user;
  GRANT insert ON TABLE auth.permission TO app_super_admin;
  GRANT update ON TABLE auth.permission TO app_super_admin;
  GRANT delete ON TABLE auth.permission TO app_super_admin;

  --||--
  CREATE FUNCTION auth.fn_timestamp_update_permission() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_permission
    BEFORE INSERT OR UPDATE ON auth.permission
    FOR EACH ROW
    EXECUTE PROCEDURE auth.fn_timestamp_update_permission();
  --||--

  -- comment on table auth.permission is E'@omit create,update,delete';

COMMIT;
