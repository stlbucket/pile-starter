-- Revert prj:structure/0070-prj-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.prj_note CASCADE;

COMMIT;
