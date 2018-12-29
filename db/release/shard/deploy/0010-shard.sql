-- Deploy shard:0010-shard to pg

BEGIN;

------------------------------------------------
-- shard_1 schema - from https://rob.conery.io/2014/05/28/a-better-id-generator-for-postgresql/
------------------------------------------------
create schema shard_1;
grant usage on schema shard_1 to app_user;

create sequence shard_1.global_id_sequence;
grant usage on sequence shard_1.global_id_sequence to app_user;

CREATE OR REPLACE FUNCTION shard_1.id_generator(OUT result bigint) AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    -- the id of this DB shard, must be set for each
    -- schema shard you have - you could pass this as a parameter too
    shard_id int := 1;
BEGIN
    SELECT nextval('shard_1.global_id_sequence') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
END;
$$ LANGUAGE PLPGSQL;

  GRANT execute ON FUNCTION shard_1.id_generator(
  ) TO app_user;

COMMIT;
