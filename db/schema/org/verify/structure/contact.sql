-- Verify org:structure/contact on pg

BEGIN;

  SELECT
    id,
    created_at,
    updated_at,
    organization_id,
    location_id,
    app_user_id,
    first_name,
    last_name,
    email,
    cell_phone,
    office_phone,
    title,
    nickname,
    external_id
  FROM org.contact
  WHERE FALSE;

  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_contact_organization' AND table_name='contact';
  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_contact_location' AND table_name='contact';
  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_contact_app_user' AND table_name='contact';

ROLLBACK;
