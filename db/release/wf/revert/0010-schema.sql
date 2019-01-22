-- Revert wf:structure/schema from pg

BEGIN;

  DROP SCHEMA wf CASCADE;

COMMIT;
