-- Revert prj:structure/0090-project-note from pg

BEGIN;

DROP TABLE IF EXISTS prj.project_note CASCADE;

COMMIT;
