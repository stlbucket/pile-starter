BEGIN;

CREATE OR REPLACE VIEW auth.vw_app_user AS 
  select * from auth.app_user;
  --||--
  GRANT select ON TABLE auth.vw_app_user TO app_super_admin;
  --||--
  comment on view auth.vw_app_user is E'@foreignKey (app_tenant_id) references auth.vw_app_tenant(id)';

COMMIT;
