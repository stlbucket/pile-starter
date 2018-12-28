-- Revert app-roles:roles from pg

BEGIN;

drop sequence if exists shard_1.global_id_sequence cascade;
drop function if exists shard_1.id_generator();
drop schema if exists shard_1 cascade;

COMMIT;
