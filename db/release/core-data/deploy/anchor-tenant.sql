-- Deploy core-data:anchor-tenent to pg

BEGIN;

  SELECT auth_fn.build_app_tenant(
    'Anchor Tenant'
    ,'anchor'
  )
  ;

  SELECT auth_fn.build_app_user(
    (SELECT id FROM auth.app_tenant WHERE identifier = 'anchor')
    ,'appsuperadmin'
    ,'badpassword'
    ,'appsuperadmin@tst.tst'
    ,'SuperAdmin'
  )
  ;

  -- insert into org.contact(app_user_id, app_tenant_id, first_name, last_name, email)
  -- values(
  --   (select id from auth.app_user where username = 'appsueradmin')
  --   ,(select id from auth.app_tenant where identifier = 'anchor')
  --   ,'Super'
  --   ,'Admin'
  --   ,'appsuperadmin@tst.tst'
  -- )
  -- ;

COMMIT;
