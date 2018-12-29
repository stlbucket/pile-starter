-- Verify tunz:structure/band on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  contact_id,
  stage_name,
  bio_blurb
  FROM tunz.player
 WHERE FALSE;

ROLLBACK;
