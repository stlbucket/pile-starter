-- Revert prj:structure/0090-project-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.project_note CASCADE;

drop function if exists prj.fn_timestamp_update_project_note() cascade;

COMMIT;
