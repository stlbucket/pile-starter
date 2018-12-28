-- Revert core-data:anchor-tenent from pg

BEGIN;

-- DELETE FROM auth.app_user;
--
-- DELETE FROM auth.app_tenant;

COMMIT;
