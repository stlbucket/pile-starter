-- Deploy ex:structure/ex to pg
-- requires: structure/schema

BEGIN;

  DROP TABLE IF EXISTS ex.special_json CASCADE;

  -- DROP FUNCTION IF EXISTS ex.fn_timestamp_update_special_json();

  DROP DOMAIN ex.cool_json;
  
COMMIT;
