-- Deploy tunz:structure/songwriter to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.songwriter (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    contact_id bigint NOT NULL,
    CONSTRAINT pk_songwriter PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.songwriter ADD CONSTRAINT fk_songwriter_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.songwriter ADD CONSTRAINT fk_songwriter_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_songwriter() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_songwriter
    BEFORE INSERT OR UPDATE ON tunz.songwriter
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_songwriter();
  --||--


  --||--
  GRANT select ON TABLE tunz.songwriter TO app_user;
  GRANT insert ON TABLE tunz.songwriter TO app_user;
  GRANT update ON TABLE tunz.songwriter TO app_user;
  GRANT delete ON TABLE tunz.songwriter TO app_user;
  --||--
  alter table tunz.songwriter enable row level security;
  --||--
  create policy select_songwriter on tunz.songwriter for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
