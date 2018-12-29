-- Deploy msg:0020-message_deliverystatus to pg
-- requires: 0010-schema

BEGIN;

CREATE TYPE msg.message_delivery_status AS ENUM (
  'Requested',
  'Delivered',
  'Acknowledged',
  'Answered'
);

COMMIT;
