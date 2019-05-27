-- Deploy leaf:structure/mme to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS leaf.mme CASCADE;

COMMIT;
