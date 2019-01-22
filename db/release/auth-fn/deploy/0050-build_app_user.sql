BEGIN;

  CREATE function auth_fn.build_app_user(
    _app_tenant_id bigint,
    _username text,
    _password text,
    _recovery_email text,
    _permission_key auth.permission_key
  ) returns auth.app_user AS $$
  DECLARE
    _app_user auth.app_user;
  BEGIN

    SELECT *
    INTO _app_user
    FROM auth.app_user
    WHERE username = _username;

    IF _app_user.id IS NOT NULL AND _app_user.app_tenant_id != _app_tenant_id THEN
      RAISE EXCEPTION 'username already taken: %', _username;
    ELSE
      INSERT INTO auth.app_user(
        app_tenant_id
        ,username
        ,password_hash
        ,password_reset_required
        ,recovery_email
        ,permission_key
      )
      SELECT
        _app_tenant_id
        ,_username
        ,public.crypt(_password, public.gen_salt('bf'))
        ,true
        ,_recovery_email
        ,_permission_key
      RETURNING *
      INTO _app_user
      ;
    END IF;

    RETURN _app_user;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.build_app_user(
    bigint,
    text,
    text,
    text,
    auth.permission_key
  ) is 'Creates a new app user';
  --||--
  GRANT execute ON FUNCTION auth_fn.build_app_user(
    bigint,
    text,
    text,
    text,
    auth.permission_key
  ) TO app_admin;

COMMIT;
