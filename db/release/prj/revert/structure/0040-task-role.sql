-- Revert prj:structure/0040-task_role from pg

BEGIN;

DROP TABLE IF EXISTS prj.task_role CASCADE;

COMMIT;
