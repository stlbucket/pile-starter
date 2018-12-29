-- Deploy evt:structure/evt to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS msg.message CASCADE;

  --||--
  DROP FUNCTION IF EXISTS msg.fn_timestamp_update_message();
  
COMMIT;
