-- Deploy evt:structure/evt to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS evt.evt_ordering_field CASCADE;
  
COMMIT;
