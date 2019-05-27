-- Deploy leaf:structure/mme to pg
-- requires: schema

BEGIN;

  CREATE TABLE leaf.mme (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL,
    global_id TEXT,
    leaf_id integer,
    leaf_external_id text,
    name text,
    certificate_number text,
    address1 text,
    address2 text,
    city text,
    state_code text,
    postal_code text,
    country_code text,
    phone text,
    mme_type text NOT NULL,
    code text,
    sender_receiver text,
    issuer text,
    bio_license_number text,
    fein text,
    bio_org_id text,
    bio_location_id text,
    -----
    -- location_id uuid NULL,
    -- import_config jsonb NOT NULL DEFAULT '{}',
    lf_import_result text,
    CONSTRAINT pk_mme PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE leaf.mme ADD CONSTRAINT fk_lf_mme_import_result FOREIGN KEY ( lf_import_result ) REFERENCES leaf.lf_import_result( id );
  --||--
  ALTER TABLE leaf.mme ADD CONSTRAINT fk_lf_mme_type FOREIGN KEY ( mme_type ) REFERENCES leaf.lf_mme_type( id );

  --||--
  CREATE FUNCTION leaf.fn_timestamp_update_mme() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
  END; $$ LANGUAGE plpgsql;
  --||--
  CREATE TRIGGER tg_timestamp_update_mme
    BEFORE INSERT OR UPDATE ON leaf.mme
    FOR EACH ROW
    EXECUTE PROCEDURE leaf.fn_timestamp_update_mme();
  --||--
COMMIT;
