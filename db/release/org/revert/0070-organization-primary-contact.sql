BEGIN;

  alter table org.organization drop column primary_contact_id;

COMMIT;
