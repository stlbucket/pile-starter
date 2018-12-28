-- Revert prj:structure/0050-contact_task_role from pg

BEGIN;

DROP TABLE IF EXISTS prj.contact_task_role CASCADE;

COMMIT;
