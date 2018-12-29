-- Deploy evt-fn:function/consume_event to pg
-- requires: structure/schema

BEGIN;

  CREATE function evt_fn.consume_event(
    _evt_id bigint
  ) returns evt.evt AS $$
  DECLARE
    _app_user auth.app_user;
    _evt evt.evt;
    _vw_evt_status evt_fn.vw_evt_processing_status;
    _result jsonb;
    _sql text;
  BEGIN
    SELECT *
    INTO _evt
    FROM evt.evt
    WHERE id = _evt_id;

    SELECT *
    INTO _app_user
    FROM auth.app_user
    WHERE id = _evt.created_by_app_user_id;

    SELECT *
    INTO _vw_evt_status
    FROM evt_fn.vw_evt_processing_status
    WHERE app_tenant_id = _app_user.app_tenant_id
    AND event_name = _evt.name;

--     IF _vw_evt_status.status = 'Error' THEN
--         _sql := 'INSERT INTO evt.evt(app_tenant_id,created_by_app_user_id,name,params,result) SELECT ''' || _app_user.app_tenant_id || ''',''' || _app_user.id || ''',''' || _evt.name || ''',''' || _evt.params || ''',''Captured'' RETURNING id;';
-- --        PERFORM pg_background_result(pg_background_launch(_sql));
--         SELECT result INTO _uuid FROM pg_background_result(pg_background_launch(_sql)) as (result uuid);
--         RAISE EXCEPTION 'Event captured but not processed - queue currently offline';
--     END IF;

--     IF _evt.result = 'Captured' AND _vw_evt_status.status = 'Online' THEN
--       _sql := 'SELECT ex_fn.consume_counter_up_evt(''' || _evt_id || ''');';

--       EXECUTE _sql INTO _result;

--       IF _result->'message' IS NULL THEN
--         UPDATE evt.evt
--         SET
--           result = 'Consumed'
--           ,outcomes = _result
--         WHERE id = _evt.id
--         RETURNING *
--         INTO _evt;
--       ELSE
--         _sql := 'INSERT INTO evt.evt(app_tenant_id,created_by_app_user_id,name,params,result,outcomes) SELECT ''' || _app_user.app_tenant_id || ''',''' || _app_user.id || ''',''' || _evt.name || ''',''' || _evt.params || ''',''Error'',''' || _result ||''' RETURNING id;';
-- --        PERFORM pg_background_result(pg_background_launch(_sql));
--         SELECT result INTO _uuid FROM pg_background_result(pg_background_launch(_sql)) as (result uuid);
--         RAISE EXCEPTION '%', _result->'message';
--       END IF;
--     END IF;

    RETURN _evt;
  END;
  $$ language plpgsql strict security definer;
  --||--
  comment on function evt_fn.consume_event(bigint) is 'Consume an event.';
  --||--
  GRANT execute ON FUNCTION evt_fn.consume_event(bigint) TO app_user;

COMMIT;
