-- Revert prj:structure/0060-milestone from pg

BEGIN;

DROP TABLE IF EXISTS prj.milestone CASCADE;

drop function if exists prj.fn_timestamp_update_milestone() cascade;

COMMIT;
