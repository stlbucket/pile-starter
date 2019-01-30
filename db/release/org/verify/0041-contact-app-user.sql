-- Verify org:structure/contact_app_user on pg

BEGIN;

  SELECT
    id,
    created_at,
    updated_at,
    contact_id,
    app_user_id,
    username
  FROM org.contact_app_user
  WHERE FALSE;

  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_contact_app_user_app_user' AND table_name='contact_app_user';
  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_contact_app_user_app_tenant' AND table_name='contact_app_user';
  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_contact_app_user_contact' AND table_name='contact_app_user';

ROLLBACK;
