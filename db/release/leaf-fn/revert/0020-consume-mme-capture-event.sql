-- Deploy evt_fn:consume_mme_capture_event to pg
-- requires: schema

BEGIN;

  drop function if exists function evt_fn.consume_mme_capture_event(bigint);

COMMIT;
