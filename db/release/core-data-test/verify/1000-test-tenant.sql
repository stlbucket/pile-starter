-- Verify core-data-test:test-tenent on pg

BEGIN;

  -- SELECT 1/count(*) FROM auth.app_tenant WHERE name = 'Anchor Tenant';
  -- SELECT 1/count(*) FROM auth.app_user WHERE username = 'appsuperadmin';

ROLLBACK;
