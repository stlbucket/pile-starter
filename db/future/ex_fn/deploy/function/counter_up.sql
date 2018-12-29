-- Deploy ex_fn:function/counter_up to pg
-- requires: structure/schema

BEGIN;

  CREATE function ex_fn.counter_up() returns ex.counter AS $$
  DECLARE
    _app_user auth.app_user;
    _counter ex.counter;
  BEGIN
    _app_user := auth_fn.current_app_user();

    UPDATE ex.counter
    SET current_value = current_value + 1
    WHERE app_tenant_id = _app_user.app_tenant_id
    RETURNING *
    INTO _counter;

    RETURN _counter;
  END;
  $$ language plpgsql strict security definer;
  --||--
  comment on function ex_fn.counter_up() is 'Increase app_tenant_token by 1.';
  --||--
  GRANT execute ON FUNCTION ex_fn.counter_up() TO app_user;

COMMIT;
