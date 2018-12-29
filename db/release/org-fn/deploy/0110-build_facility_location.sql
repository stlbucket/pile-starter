-- Deploy org-fn:function/build_facility_location to pg
-- requires: structure/facility

BEGIN;

  create function org_fn.build_facility_location(
    _facility_id bigint
    ,_name text
    ,_address1 text
    ,_address2 text
    ,_city text
    ,_state text
    ,_zip text
    ,_lat text
    ,_lon text
  )
  returns org.facility as $$
  declare
    _app_user auth.app_user;
    _facility org.facility;
    _location org.location;
  begin
    _app_user := auth_fn.current_app_user();
    
    SELECT *
    INTO _facility
    FROM org.facility o
    WHERE id = _facility_id
    AND auth_fn.app_user_has_access(o.app_tenant_id)
    ;

    IF _facility.id IS NULL THEN
      RAISE EXCEPTION 'No facility for id: %', _facility_id;
    END IF;
    
    IF _facility.location_id IS NULL THEN
      _location := org_fn.build_location(
        _name
        ,_address1
        ,_address2
        ,_city
        ,_state
        ,_zip
        ,_lat
        ,_lon
      );

      UPDATE org.facility
      SET location_id = _location.id
      WHERE id = _facility_id
      RETURNING *
      INTO _facility
      ;
    ELSE
      _location := org_fn.modify_location(
        _facility.location_id
        ,_name
        ,_address1
        ,_address2
        ,_city
        ,_state
        ,_zip
        ,_lat
        ,_lon
      )
      ;
    END IF;

    RETURN _facility;

  end;
  $$ language plpgsql strict security definer;

  GRANT EXECUTE ON FUNCTION org_fn.build_facility_location(
    bigint
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
    ,text
  ) TO app_user;

COMMIT;
