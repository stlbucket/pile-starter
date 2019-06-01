-- Deploy evt:structure/evt to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE evt.evt_processing_result (
    id text not null unique check (id != '')
    ,CONSTRAINT pk_evt_processing_result_type PRIMARY KEY (id)
  );
  --||--
  grant select on evt.evt_processing_result to app_user;

  insert into evt.evt_processing_result(id)
  values
    ('Captured')
    ,('Consumed')
    ,('Error')
    ,('Acknowledged')
  ;

COMMIT;


-- -- Deploy evt:custom-type/evt-processing-result to pg
-- -- requires: structure/schema

-- BEGIN;

-- CREATE TYPE evt.evt_processing_result AS ENUM (
--   'Captured',
--   'Consumed',
--   'Error',
--   'Acknowledged'
-- );

-- COMMIT;
