-- Revert prj:structure/0110-task-dependency from pg

BEGIN;

DROP TABLE IF EXISTS prj.task_dependency CASCADE;

COMMIT;
