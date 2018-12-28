-- Revert prj:structure/0020-schema from pg

BEGIN;

DROP TABLE IF EXISTS prj.project CASCADE;

COMMIT;
