-- Revert prj:structure/0080-task-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.task_note CASCADE;

COMMIT;
