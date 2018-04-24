-- Deploy auth_fn:function/authenticate to pg
-- requires: custom-type/jwt-token
-- requires: structure/app_user

BEGIN;

  CREATE function auth_fn.authenticate(
    _username text,
    _password text
  ) returns auth.jwt_token AS $$
  DECLARE
    _app_user auth.app_user;
  BEGIN
    SELECT *
    INTO _app_user
    FROM auth.app_user
    WHERE username = _username;

    IF _app_user.password_hash = crypt(_password, _app_user.password_hash) THEN
      IF _app_user.permission_key = 'SuperAdmin' THEN
        RETURN ('app_super_admin', _app_user.id, null)::auth.jwt_token;
      ELSEIF _app_user.permission_key = 'Admin' THEN
        RETURN ('app_admin', _app_user.id, null)::auth.jwt_token;
      ELSEIF _app_user.permission_key = 'User' THEN
        RETURN ('app_user', _app_user.id, null)::auth.jwt_token;
      ELSEIF _app_user.permission_key = 'Demon' THEN
        RETURN ('app_sync', _app_user.id, null)::auth.jwt_token;
      END IF;
  
      RAISE EXCEPTION 'Invalid permission key: %', _soro_user.permission_key;
    ELSE
      RAISE EXCEPTION 'Invalid username or password';
    END IF;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.authenticate(
    text,
    text
  ) is 'Creates a JWT token that will securely identify a contact and give them certain permissions.';
  --||--
  GRANT execute ON FUNCTION auth_fn.authenticate(
    text,
    text
  ) TO app_anonymous, app_user;

COMMIT;
