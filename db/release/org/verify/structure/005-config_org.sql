-- Verify org:structure/config_org on pg

BEGIN;

  SELECT
    id,
    key,
    value
  FROM org.config_org
  WHERE FALSE;

ROLLBACK;
