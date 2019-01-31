-- Verify core-data-test:1100-address-book on pg

BEGIN;

  -- SELECT 1/count(*) FROM auth.app_tenant WHERE name = 'Anchor Tenant';
  -- SELECT 1/count(*) FROM auth.app_user WHERE username = 'appsuperadmin';

ROLLBACK;
