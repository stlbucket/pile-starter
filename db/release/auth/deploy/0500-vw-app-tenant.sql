BEGIN;

CREATE OR REPLACE VIEW auth.vw_app_tenant AS 
  select * from auth.app_tenant;
  --||--
  GRANT select ON TABLE auth.vw_app_tenant TO app_super_admin;
  --||--
  comment on view auth.vw_app_tenant is E'@primaryKey id';

COMMIT;
