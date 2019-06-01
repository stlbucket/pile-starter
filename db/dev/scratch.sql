  insert into evt.evt_type(
    id
    ,ordering_field
    ,consume_handler
    ,revert_handler
  )
  values (
    'leaf.mme.capture'
    ,'updated_at'
    ,'leaf.lf_consume_mme'
    ,null
  )
  ;
