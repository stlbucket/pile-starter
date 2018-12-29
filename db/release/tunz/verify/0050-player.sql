-- Verify tunz:structure/band on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  contact_id
  FROM tunz.player
 WHERE FALSE;

ROLLBACK;
