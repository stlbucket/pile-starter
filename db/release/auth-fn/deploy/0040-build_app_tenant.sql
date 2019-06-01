BEGIN;

  CREATE function auth_fn.build_app_tenant(
    _name text
    ,_identifier text
  ) returns auth.app_tenant AS $$
  DECLARE
    _matcher text;
    _app_tenant auth.app_tenant;
  BEGIN
    if _name is null or _name = '' then
      raise exception 'Must specify name to create app tenant';
    end if;

    if _identifier is null or _identifier = '' then
      raise exception 'Must specify identifier to create app tenant';
    end if;

    SELECT *
    INTO _app_tenant
    FROM auth.app_tenant
    WHERE identifier = _identifier;

    IF _app_tenant.id IS NULL THEN
      INSERT INTO auth.app_tenant(
        name
        ,identifier
      )
      SELECT
        _name
        ,_identifier
      RETURNING *
      INTO _app_tenant
      ;
    END IF;

--    RAISE EXCEPTION '
--    _name: %
--    _app_tenant: %
--    '
--    ,_name
--    ,_app_tenant
--    ;

    RETURN _app_tenant;
  end;
  $$ language plpgsql strict security definer;
  --||--
  comment on function auth_fn.build_app_tenant(
    text,
    text
  ) is 'Creates a new app user';
  --||--
  GRANT execute ON FUNCTION auth_fn.build_app_tenant(
    text,
    text
  ) TO app_super_admin;

COMMIT;
