-- Deploy org-fn:function/build_organization to pg
-- requires: structure/organization

BEGIN;

create function org_fn.build_tenant_organization(
  _name text
  ,_identifier text
  ,_primary_contact_email text
  ,_primary_contact_first_name text
  ,_primary_contact_last_name text
)
returns org.organization as $$
declare
  _app_tenant auth.app_tenant;
  _app_user auth.app_user;
  _organization org.organization;
  _primary_contact org.contact;
begin
  _app_tenant := auth_fn.build_app_tenant(
    _name
    ,''
  );

  SELECT *
  INTO _app_user
  FROM auth.app_user
  WHERE app_tenant_id = _app_tenant.id
  AND username = _primary_contact_email
  ;

--  RAISE EXCEPTION '
--  _name: %
--  _username: %
--  _app_tenant_id: %
--  _app_user: %
--  '
--  ,_name
--  ,_primary_contact_email
--  ,_app_tenant.id
--  ,_app_user
--  ;

  IF _app_user.id IS NULL THEN
    _app_user := auth_fn.build_app_user(
        _app_tenant.id
        ,_primary_contact_email
        ,'badpassword'
        ,'Admin'
      )
    ;
  END IF;

  SELECT *
  INTO _organization
  FROM org.organization
  WHERE name = _name
  AND app_tenant_id = _app_tenant.id
  ;

  IF _organization.id IS NULL THEN
    INSERT INTO
    org.organization(
      name
      ,external_id
      ,app_tenant_id
      ,actual_app_tenant_id
    )
    SELECT
      _name
      ,_identifier
      ,_app_tenant.id
      ,_app_tenant.id
    RETURNING *
    INTO _organization;
  END IF;

  UPDATE auth.app_tenant
  SET identifier = _organization.id
  WHERE id = _app_tenant.id
  RETURNING *
  INTO _app_tenant
  ;

  SELECT *
  INTO _primary_contact
  FROM org.contact
  WHERE organization_id = _organization.id
  AND email = _primary_contact_email;

  IF _primary_contact.id IS NULL THEN
    _primary_contact := org_fn.build_contact(
      _primary_contact_first_name
      ,_primary_contact_last_name
      ,_primary_contact_email
      ,''
      ,''
      ,''
      ,''
      ,''
      ,_organization.id
    );

    UPDATE org.contact
    SET app_user_id = _app_user.id
    WHERE id = _primary_contact.id
    ;
  END IF;

  RETURN _organization;

end;
$$ language plpgsql strict security definer;

GRANT EXECUTE ON FUNCTION org_fn.build_tenant_organization(
  text
  ,text
  ,text
  ,text
  ,text
) TO app_super_admin;

COMMIT;
