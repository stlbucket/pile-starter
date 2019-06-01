-- Deploy evt:structure/evt_type to pg
-- requires: structure/schema

BEGIN;

  CREATE TABLE evt.evt_type (
    id text NOT NULL unique check (id != '')
    ,ordering_field text not null
    ,consume_handler text not null check(consume_handler != '')
    ,revert_handler text null
    ,CONSTRAINT pk_evt_type PRIMARY KEY (id)
  );
  --||--
  ALTER TABLE evt.evt_type ADD CONSTRAINT fk_evt_type_order_field FOREIGN KEY ( ordering_field ) REFERENCES evt.evt_ordering_field( id );
  --||--
  grant select on evt.evt_type to app_user;


  insert into evt.evt_type(
    id
    ,ordering_field
    ,consume_handler
    ,revert_handler
  )
  values (
    'leaf.mme.capture'
    ,'external_occurred_at'
    ,'leaf.lf_consume_mme'
    ,null
  )
  ;

COMMIT;
