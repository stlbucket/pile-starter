-- Revert ex_fn:structure/schema from pg

BEGIN;

  DROP SCHEMA ex_fn CASCADE;

COMMIT;
