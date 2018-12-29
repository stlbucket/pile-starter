-- Revert prj:structure/0030task from pg

BEGIN;

DROP TABLE IF EXISTS prj.task CASCADE;

drop function if exists prj.fn_timestamp_update_task() cascade;

COMMIT;
