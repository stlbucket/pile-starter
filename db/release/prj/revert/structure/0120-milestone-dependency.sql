-- Revert prj:structure/0120-milestone-dependency from pg

BEGIN;

DROP TABLE IF EXISTS prj.milestone_dependency CASCADE;

COMMIT;
