-- Revert prj:structure/0110-task-dependency from pg

BEGIN;

DROP TABLE IF EXISTS prj.task_dependency CASCADE;

drop function if exists prj.fn_timestamp_update_task_dependency() cascade;

COMMIT;
