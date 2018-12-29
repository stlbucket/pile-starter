-- Revert prj:structure/0070-prj-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.prj_note CASCADE;

drop function if exists prj.fn_timestamp_update_prj_note() cascade;

COMMIT;
