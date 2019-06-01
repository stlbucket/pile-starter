-- Deploy leaf_fn:structure/consume_mme_capture_event to pg
-- requires: structure/schema

begin;
  create or replace function evt_fn.consume_mme_capture_event(
    _evt_id bigint
  ) returns evt.evt AS $$
  DECLARE
    -- _app_user auth.app_user;
    _evt evt.evt;
    _org org.organization;
    _location org.location;
    _org_name text;
    _global_id text;
    _code text;
    _app_tenant auth.app_tenant;
    _certificate_number text;
    _trim_regex text;
    _sql text;
  BEGIN
    -- _app_user := (SELECT auth_fn.current_app_user());
    _trim_regex := '\S(?:.*\S)*';

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

    _org_name := substring(_evt.params->>'name', _trim_regex);
    _global_id := substring(_evt.params->>'global_id', _trim_regex);
    _code := substring(_evt.params->>'code', _trim_regex);
    _certificate_number := substring(_evt.params->>'certificate_number', _trim_regex);

    _app_tenant := (select auth_fn.build_app_tenant(
      _org_name
      ,_org_name || '-' || _certificate_number || '-' || _global_id ||'-' || _code
    ));

    -- RAISE notice '% % %', '-', _evt.params->>'name', '-';
    -- RAISE exception '% % %', '-' , _app_tenant, '-';

    select *
    into _org
    from org.organization
    where external_id = _certificate_number
    ;

    if _org.id is null then
      insert into org.organization(
        name
        ,app_tenant_id
        ,external_id
      )
      values(
        _org_name
        ,_app_tenant.id
        ,_certificate_number
      )
      returning *
      into _org
      ;
    end if;

    select *
    into _location
    from org.location
    where id = _org.location_id
    ;

    if _location.id is null then
      insert into org.location(
        name
        ,address1
        ,address2
        ,city
        ,state
        ,zip
        ,external_id
      )
      values (
        _org.name || ' - ' || _code
        ,substring(_evt.params->>'address1', _trim_regex)
        ,substring(_evt.params->>'address2', _trim_regex)
        ,substring(_evt.params->>'city', _trim_regex)
        ,substring(_evt.params->>'state_code', _trim_regex)
        ,substring(_evt.params->>'postal_code', _trim_regex)
        ,substring(_evt.params->>'postal_code', _trim_regex)
        ,_code
      )
      returning *
      into _location
      ;

      update org.organization
      set location_id = _location.id
      where id = _org.id
      ;
    end if;
    
    update evt.evt
    set 
      result = 'Consumed'
      ,entity_id_internal = _org.id
      ,entity_id_external = _global_id
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

-- commit;
    select * from auth.app_user;

-- delete from auth.app_tenant where 
delete from org.organization where id in (select entity_id_internal from evt.evt);
update evt.evt set entity_id_external = null, entity_id_internal = null, result = 'Captured' where result = 'Consumed';

  select count(*) captured from evt.evt where result = 'Captured';
  DO $$
  DECLARE
   _evt evt.evt;
  BEGIN
    -- select * into _evt from evt.evt limit 1;
    -- raise notice 'evt: % -- %', _evt.id, _evt.result;

    set jwt.claims.app_user_id to '2056243521530102786';
    set jwt.claims.app_tenant_id to '2056243521462993921';


    -- perform evt_fn.consume_mme_capture_event(id) from evt.evt where result = 'Captured';
    _evt := (select evt_fn.consume_mme_capture_event(id) from evt.evt where result = 'Captured' limit 1);
    -- _evt := (select evt_fn.consume_mme_capture_event(45));
    -- _evt := (select evt_fn.consume_mme_capture_event(2055569431202890870));

    -- raise notice 'evt: % -- %', _evt.id, _evt.result;
  END$$;

    select count(*) captured from evt.evt where result = 'Captured';
    -- select * from org.organization;
  -- select * from org.location;

-- rollback;
commit;