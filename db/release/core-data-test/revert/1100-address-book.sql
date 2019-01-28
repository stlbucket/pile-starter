-- Revert core-data-test:test-tenent from pg

BEGIN;

-- DELETE FROM auth.app_user;
--
-- DELETE FROM auth.app_tenant;

COMMIT;
