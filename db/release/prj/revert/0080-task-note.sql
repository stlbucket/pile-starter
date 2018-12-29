-- Revert prj:structure/0080-task-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.task_note CASCADE;

drop function if exists prj.fn_timestamp_update_task_note() cascade;

COMMIT;
