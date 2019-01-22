-- Deploy core-data-test:test-tenent to pg

BEGIN;

    SET jwt.claims.app_user_id TO 12312;

    select org_fn.build_tenant_organization(
      'Default Test Tenant'
      ,'T000002'
      ,'defaultadmin@tst.tst'
      ,'Default Admin'
      ,'Test'
    );

    select org_fn.build_contact(
      'Default User'
      ,'Test'
      ,'defaultuser@tst.tst'
      ,''
      ,''
      ,''
      ,''
      ,''
      ,(select id from org.organization where external_id = 'T000002')
    )
    ;

    select auth_fn.build_app_user(
      (select id from auth.app_tenant where identifier = 'T000002')
      ,'defaultuser'
      ,'badpassword'
      ,'defaultuser@tst.tst'
      ,'User'
    )
    ;

    select org_fn.build_tenant_organization(
      'Other Test Tenant'
      ,'T000003'
      ,'otheradmin@tst.tst'
      ,'Other Admin'
      ,'Test'
    );

    select org_fn.build_contact(
      'Other User'
      ,'Test'
      ,'otheruser@tst.tst'
      ,''
      ,''
      ,''
      ,''
      ,''
      ,(select id from org.organization where external_id = 'T000003')
    )
    ;

    select auth_fn.build_app_user(
      (select id from auth.app_tenant where identifier = 'T000003')
      ,'otheruser'
      ,'badpassword'
      ,'otheruser@tst.tst'
      ,'User'
    )
    ;

    update org.contact c set app_user_id = (select id from auth.app_user where recovery_email = c.email);

COMMIT;
