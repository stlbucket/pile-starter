-- Deploy evt:custom-type/permission-key to pg
-- requires: structure/schema

BEGIN;

CREATE TYPE msg.message_status AS ENUM (
  'Sent',
  'Delivered',
  'Ignored',
  'Acknowledged'
);

COMMIT;
