-- Deploy leaf:structure/mme_type to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS leaf.mme_type CASCADE;

COMMIT;
