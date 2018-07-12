-- Verify tunz:structure/venue on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  external_id,
  organization_id
  FROM tunz.venue
 WHERE FALSE;

ROLLBACK;
