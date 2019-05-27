-- Deploy leaf:structure/lf_import_result to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS leaf.lf_import_result CASCADE;

COMMIT;
