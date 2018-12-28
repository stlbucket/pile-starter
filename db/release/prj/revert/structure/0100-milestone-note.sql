-- Revert prj:structure/0100-milestone-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.milestone_note CASCADE;

COMMIT;
