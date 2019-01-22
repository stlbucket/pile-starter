-- Deploy org-fn:function/current_app_user_contact to pg
-- requires: auth:function/current_app_user
-- requires: structure/contact

BEGIN;

create or replace function org_fn.current_app_user_contact()
returns org.contact as $$
declare
  _app_user auth.app_user;
  _contact org.contact;
begin
  _app_user := (SELECT auth_fn.current_app_user());

  SELECT *
  INTO _contact
  FROM org.contact
  WHERE app_user_id = _app_user.id;

  RETURN _contact;

end;
$$ language plpgsql strict security definer;

GRANT EXECUTE ON FUNCTION org_fn.current_app_user_contact() TO app_user;

COMMIT;