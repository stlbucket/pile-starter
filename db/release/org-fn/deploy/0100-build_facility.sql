-- Deploy org-fn:function/build_facility to pg
-- requires: structure/facility

BEGIN;

  create function org_fn.build_facility(
    _organization_id bigint
    ,_name text
    ,_external_id text
  )
  returns org.facility as $$
  declare
    _app_user auth.app_user;
    _app_tenant_id bigint;
    _facility org.facility;
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
    INTO _facility
    FROM org.facility
    WHERE (name = _name AND organization_id = _organization_id)
    OR (external_id = _external_id AND organization_id = _organization_id)
    ;

    IF _facility.id IS NULL THEN
      INSERT INTO org.facility(
        organization_id
        ,app_tenant_id
        ,name
        ,external_id
      )
      SELECT
        _organization_id
        ,_organization.app_tenant_id
        ,_name
        ,_external_id
      RETURNING *
      INTO _facility;
    END IF;

    RETURN _facility;

  end;
  $$ language plpgsql strict security definer;

  GRANT EXECUTE ON FUNCTION org_fn.build_facility(
    bigint
    ,text
    ,text
  ) TO app_user;

COMMIT;
