-- Revert prj:structure/0030task from pg

BEGIN;

DROP TABLE IF EXISTS prj.task CASCADE;

COMMIT;
