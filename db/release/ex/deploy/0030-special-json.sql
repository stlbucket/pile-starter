-- Deploy ex:structure/ex to pg
-- requires: structure/schema

BEGIN;


  create domain ex.cool_json as jsonb;

  CREATE TABLE ex.special_json (
    id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
    name text,
    some_cool_json ex.cool_json NOT NULL DEFAULT '{}',
    CONSTRAINT pk_ex PRIMARY KEY (id)
  );
  --||--
  GRANT select ON TABLE ex.special_json TO app_user;
  GRANT insert ON TABLE ex.special_json TO app_user;
  GRANT update ON TABLE ex.special_json TO app_user;
  GRANT delete ON TABLE ex.special_json TO app_user;

  insert into ex.special_json(name, some_cool_json)
  select 'dinner', '{"tacos": "bellgrande"}';

COMMIT;
