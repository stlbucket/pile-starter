-- Deploy org_fn:function/build_contact to pg
-- requires: structure/contact

BEGIN;

  create function org_fn.build_contact(
    _first_name text
    ,_last_name text
    ,_email text
    ,_cell_phone text
    ,_office_phone text
    ,_title text
    ,_nickname text
    ,_external_id text
    ,_organization_id bigint
  )
  returns org.contact as $$
  declare
    _app_user auth.app_user;
    _app_tenant_id bigint;
    _contact org.contact;
    _organization org.organization;
  begin
    _app_user := auth_fn.current_app_user();

    SELECT *
    INTO _organization
    FROM org.organization
    WHERE id = _organization_id;

    IF _organization.id IS NULL THEN
      RAISE EXCEPTION 'No organization exists for id: %', _organization_id;
    END IF;

    SELECT *
    INTO _contact
    FROM org.contact
    WHERE (email = _email AND app_tenant_id = _app_user.app_tenant_id)
    OR (external_id = _external_id AND app_tenant_id = _app_user.app_tenant_id);

    IF _contact.id IS NULL THEN
      INSERT INTO org.contact(
        first_name
        ,last_name
        ,email
        ,cell_phone
        ,office_phone
        ,title
        ,nickname
        ,organization_id
        ,app_tenant_id
      )
      SELECT
        _first_name
        ,_last_name
        ,_email
        ,_cell_phone
        ,_office_phone
        ,_title
        ,_nickname
        ,_organization_id
        ,_organization.app_tenant_id
      RETURNING *
      INTO _contact;
    END IF;

    RETURN _contact;

  end;
  $$ language plpgsql strict security definer;

  GRANT EXECUTE ON FUNCTION org_fn.build_contact(
    text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,bigint
  ) TO app_user;

COMMIT;
