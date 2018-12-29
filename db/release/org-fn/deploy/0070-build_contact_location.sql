-- Deploy org-fn:function/build_contact_location to pg
-- requires: structure/contact

BEGIN;

  create function org_fn.build_contact_location(
    _contact_id bigint
    ,_name text
    ,_address1 text
    ,_address2 text
    ,_city text
    ,_state text
    ,_zip text
    ,_lat text
    ,_lon text
  )
  returns org.contact as $$
  declare
    _app_user auth.app_user;
    _contact org.contact;
    _location org.location;
  begin
    _app_user := auth_fn.current_app_user();
    
    SELECT *
    INTO _contact
    FROM org.contact c
    WHERE id = _contact_id
    AND auth_fn.app_user_has_access(c.app_tenant_id)
    ;

    IF _contact.id IS NULL THEN
      RAISE EXCEPTION 'No contact for id: %', _contact_id;
    END IF;

    IF _contact.location_id IS NULL THEN
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

      UPDATE org.contact c
      SET location_id = _location.id
      WHERE id = _contact_id
      RETURNING *
      INTO _contact
      ;
    ELSE
      _location := org_fn.modify_location(
        _contact.location_id
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

    RETURN _contact;

  end;
  $$ language plpgsql strict security definer;

  GRANT EXECUTE ON FUNCTION org_fn.build_contact_location(
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
