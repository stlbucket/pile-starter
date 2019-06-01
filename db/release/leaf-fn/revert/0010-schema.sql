-- Revert leaf_fn:structure/schema from pg

BEGIN;

  DROP SCHEMA leaf_fn CASCADE;

COMMIT;
