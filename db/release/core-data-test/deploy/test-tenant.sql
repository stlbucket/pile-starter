-- Deploy core-data-test:test-tenent to pg

BEGIN;

    SET jwt.claims.app_user_id TO 12312;

      select org_fn.build_tenant_organization(
      'Default Test Tenant'
      ,'T000002'
      ,'appadmintest@tst.tst'
      ,'Admin'
      ,'Test'
    );

COMMIT;
