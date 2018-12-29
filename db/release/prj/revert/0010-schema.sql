-- Revert prj:structure/0020-schema from pg

BEGIN;

DROP SCHEMA prj CASCADE;

COMMIT;
