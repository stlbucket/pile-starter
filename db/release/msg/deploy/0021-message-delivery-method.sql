-- Deploy msg:0021-message_delivery_method to pg
-- requires: 0010-schema

BEGIN;

CREATE TYPE msg.message_delivery_method AS ENUM (
  'SMS',
  'EMAIL',
  'IN_APP'
);

COMMIT;
