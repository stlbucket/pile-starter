-- Revert core-data-test:test-tenent from pg

BEGIN;

delete from org.contact_app_user;

DELETE FROM auth.app_user where permission_key != 'SuperAdmin';

DELETE FROM auth.app_tenant where key != 'anchor';

COMMIT;
