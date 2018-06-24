-- Revert org:structure/config_org from pg

BEGIN;

  DROP TABLE IF EXISTS org.config_org;

COMMIT;
