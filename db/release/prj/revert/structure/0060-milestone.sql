-- Revert prj:structure/0060-milestone from pg

BEGIN;

DROP TABLE IF EXISTS prj.milestone CASCADE;

COMMIT;
