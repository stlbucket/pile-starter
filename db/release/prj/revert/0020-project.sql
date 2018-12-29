-- Revert prj:structure/0020-schema from pg

BEGIN;

DROP TABLE IF EXISTS prj.project CASCADE;

drop function if exists prj.fn_timestamp_update_project() cascade;

COMMIT;
