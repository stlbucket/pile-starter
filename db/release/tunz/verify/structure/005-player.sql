-- Verify tunz:structure/band on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  external_id,
  first_name,
  last_name,
  stage_name,
  bio_blurb
  FROM tunz.player
 WHERE FALSE;

ROLLBACK;
