-- Revert evt-fn:structure/schema from pg

BEGIN;

  DROP SCHEMA evt_fn CASCADE;

COMMIT;
