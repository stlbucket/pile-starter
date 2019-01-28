BEGIN;

  alter table org.organization add column primary_contact_id bigint null;
  --||--
  alter table org.organization ADD constraint fk_organization_primary_contact FOREIGN KEY ( primary_contact_id ) REFERENCES org.contact( id );

COMMIT;
