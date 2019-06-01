-- Deploy evt-fn:function/capture_event to pg
-- requires: structure/schema

BEGIN;
  create type evt.evt_capture_info as (
    app_tenant_id bigint,
    evt_type text,
    external_occurred_at timestamp,
    external_tx_id text,
    entity_id_external text,
    entity_id_internal bigint,
    params jsonb
  );

  CREATE or replace function evt_fn.capture_event(
    _evt_capture_info evt.evt_capture_info
  ) returns evt.evt AS $$
  DECLARE
    _app_user auth.app_user;
    _app_tenant_id bigint;
    _idempotency_hash text;
    _evt evt.evt;
  BEGIN
    _app_user := (SELECT auth_fn.current_app_user());
    _app_tenant_id := coalesce(_evt_capture_info.app_tenant_id, _app_user.app_tenant_id);


    -- for now, we are creating an easy way to enforce idempotency
    -- this will change, most likely
    _idempotency_hash := _evt_capture_info.params::text; 

    select *
    into _evt
    from evt.evt
    where idempotency_hash = _idempotency_hash
    ;

    if _evt.id is null then
      insert into evt.evt(
        app_tenant_id
        ,created_by_app_user_id
        ,evt_type
        ,idempotency_hash
        ,entity_id_internal
        ,entity_id_external
        ,external_occurred_at
        ,external_tx_id
        ,params
        ,result
      )
      values (
        _app_user.app_tenant_id
        ,_app_user.id
        ,_evt_capture_info.evt_type
        ,_idempotency_hash
        ,_evt_capture_info.entity_id_internal
        ,_evt_capture_info.entity_id_external
        ,_evt_capture_info.external_occurred_at
        ,_evt_capture_info.external_tx_id
        ,_evt_capture_info.params
        ,'Captured'
      )
      returning *
      into _evt
      ;
    end if;
  
    RETURN _evt;
  END;
  $$ language plpgsql strict security definer;
  --||--
  comment on function evt_fn.capture_event(evt.evt_capture_info) is 'Capture an event.';
  --||--
  GRANT execute ON FUNCTION evt_fn.capture_event(evt.evt_capture_info) TO app_user;

COMMIT;
