-- Verify org:structure/organization on pg

BEGIN;

  SELECT
    id,
    created_at,
    updated_at,
    name,
    location_id,
    external_id
  FROM org.organization
  WHERE FALSE;

  SELECT 1/COUNT(*) FROM information_schema.table_constraints WHERE constraint_name='fk_organization_location' AND table_name='organization';

ROLLBACK;
