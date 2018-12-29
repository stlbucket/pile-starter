-- Deploy evt:custom-type/permission-key to pg
-- requires: structure/schema

BEGIN;

CREATE TYPE evt.evt_processing_result AS ENUM (
  'Captured',
  'Consumed',
  'Error',
  'Acknowledged'
);

COMMIT;
