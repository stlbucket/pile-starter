-- Revert evt-fn:function/consume_event from pg

BEGIN;

drop function if exists evt_fn.capture_event(bigint);
drop type evt.evt_capture_info

COMMIT;
