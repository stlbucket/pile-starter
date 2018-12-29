-- Revert prj:structure/0050-contact_task_role from pg

BEGIN;

DROP TABLE IF EXISTS prj.contact_task_role CASCADE;

drop function if exists prj.fn_timestamp_update_contact_task_role() cascade;

COMMIT;
