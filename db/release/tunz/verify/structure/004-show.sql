-- Verify tunz:structure/show on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  external_id,
  venue_id,
  show_date,
  door_time
  FROM tunz.show
 WHERE FALSE;

ROLLBACK;
