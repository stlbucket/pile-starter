-- Revert evt-fn:function/consume_event from pg

BEGIN;

drop function if exists evt_fn.consume_event(bigint);

COMMIT;
