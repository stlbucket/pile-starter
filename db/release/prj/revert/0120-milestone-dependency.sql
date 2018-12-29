-- Revert prj:structure/0120-milestone-dependency from pg

BEGIN;

DROP TABLE IF EXISTS prj.milestone_dependency CASCADE;

drop function if exists prj.fn_timestamp_update_milestone_dependency() cascade;

COMMIT;
