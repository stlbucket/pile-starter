-- Revert evt:structure/schema from pg

BEGIN;

  DROP SCHEMA msg CASCADE;

COMMIT;
