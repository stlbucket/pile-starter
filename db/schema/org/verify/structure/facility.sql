-- Verify org:structure/facility on pg

BEGIN;

SELECT
  id,
  app_tenant_id,
  created_at,
  updated_at,
  organization_id,
  location_id,
  name,
  external_id
  FROM org.facility
 WHERE FALSE;

ROLLBACK;
