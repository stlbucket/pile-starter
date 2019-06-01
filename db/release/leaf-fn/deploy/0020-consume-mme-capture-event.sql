-- Deploy leaf_fn:structure/consume_mme_capture_event to pg
-- requires: structure/schema

begin;
  create or replace function evt_fn.consume_mme_capture_event(
    _evt_id bigint
  ) returns evt.evt AS $$
  DECLARE
    _app_user auth.app_user;
    _evt evt.evt;
    _org org.organization;
    _sql text;
  BEGIN
    _app_user := (SELECT auth_fn.current_app_user());


    select *
    into _evt
    from evt.evt
    where id = _evt_id
    ;
    raise notice 'evt: % -- %', _evt.id, _evt.result;

    if _evt.id is null then
      raise exception 'no evt.evt for id: %', _evt_id;
    end if;
    
    if _evt.result != 'Captured' then
      raise exception 'event has already been consumed: %', _evt_id;
    end if;

    raise notice 'name: %', _evt.params->>'name';

    select *
    into _org
    from org.organization
    where name = _evt.params->>'name'
    and external_id = _evt.params->>'code'
    and app_tenant_id = _app_user.app_tenant_id
    ;

    if _org.id is null then
      insert into org.organization(
        name
        ,app_tenant_id
        ,external_id
      )
      values(
        substring(_evt.params->>'name', '\S(?:.*\S)*')
        ,_app_user.app_tenant_id
        ,_evt.params->>'code'
      )
      returning *
      into _org
      ;

    end if;
    
    update evt.evt
    set 
      result = 'Consumed'
      ,entity_id_internal = _org.id
      ,entity_id_external = _evt.params->>'global_id'
    where id = _evt_id
    returning *
    into _evt
    ;

    raise notice 'evt: % -- %', _evt.id, _evt.result;
    RETURN _evt;
  END;
  $$ language plpgsql strict security definer;
  --||--
  comment on function evt_fn.consume_mme_capture_event(bigint) is 'Consume an mme record from leaf.';
  --||--
  GRANT execute ON FUNCTION evt_fn.consume_mme_capture_event(bigint) TO app_demon;
commit;