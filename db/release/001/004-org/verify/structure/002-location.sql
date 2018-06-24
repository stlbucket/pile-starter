-- Verify org:structure/location on pg

BEGIN;

SELECT
  id,
  created_at,
  updated_at,
  name,
  address1,
  address2,
  city,
  state,
  zip,
  lat,
  lon,
  external_id
  FROM org.location
 WHERE FALSE;

ROLLBACK;
