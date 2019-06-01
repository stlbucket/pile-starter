BEGIN;

  CREATE TABLE evt.evt_ordering_field (
    id text not null unique check (id != '')
    ,CONSTRAINT pk_evt_ordering_field_type PRIMARY KEY (id)
  );
  --||--
  grant select on evt.evt_ordering_field to app_user;

  insert into evt.evt_ordering_field(id)
  values
    ('external_occurred_at')
    ,('external_tx_identifier')
    ,('id')
  ;

COMMIT;
