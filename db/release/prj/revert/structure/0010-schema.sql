-- Revert prj:structure/0010-schema from pg

BEGIN;

DROP SCHEMA prj CASCADE;

COMMIT;
