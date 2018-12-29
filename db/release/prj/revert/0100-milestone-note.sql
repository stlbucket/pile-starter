-- Revert prj:structure/0100-milestone-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.milestone_note CASCADE;

drop function if exists prj.fn_timestamp_update_milestone_note() cascade;

COMMIT;
