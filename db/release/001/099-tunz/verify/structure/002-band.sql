-- Verify tunz:structure/band on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  external_id,
  organization_id
  FROM tunz.band
 WHERE FALSE;

ROLLBACK;
