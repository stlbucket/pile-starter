-- Revert app-roles:roles from pg

BEGIN;

drop schema if exists shard_1 cascade;

COMMIT;
