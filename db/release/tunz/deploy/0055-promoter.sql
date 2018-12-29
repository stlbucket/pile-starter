-- Deploy tunz:structure/promoter to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE tunz.promoter (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    app_tenant_id bigint NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    contact_id bigint NOT NULL,
    CONSTRAINT pk_promoter PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE tunz.promoter ADD CONSTRAINT fk_promoter_app_tenant FOREIGN KEY ( app_tenant_id ) REFERENCES auth.app_tenant( id );
  --||--
  ALTER TABLE tunz.promoter ADD CONSTRAINT fk_promoter_contact FOREIGN KEY ( contact_id ) REFERENCES org.contact( id );

  --||--
  CREATE FUNCTION tunz.fn_timestamp_update_promoter() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_promoter
    BEFORE INSERT OR UPDATE ON tunz.promoter
    FOR EACH ROW
    EXECUTE PROCEDURE tunz.fn_timestamp_update_promoter();
  --||--


  --||--
  GRANT select ON TABLE tunz.promoter TO app_user;
  GRANT insert ON TABLE tunz.promoter TO app_user;
  GRANT update ON TABLE tunz.promoter TO app_user;
  GRANT delete ON TABLE tunz.promoter TO app_user;
  --||--
  alter table tunz.promoter enable row level security;
  --||--
  create policy select_promoter on tunz.promoter for select
    using (auth_fn.app_user_has_access(app_tenant_id) = true);

COMMIT;
