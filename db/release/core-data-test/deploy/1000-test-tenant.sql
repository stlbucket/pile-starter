BEGIN;
    -- create test tenants
    insert into auth.app_tenant(name, identifier)
    values
      ('Test Tenant 001', 'test-001')
      ,('Test Tenant 002', 'test-002')
      ,('Test Tenant 003', 'test-003')
    on conflict (identifier)
    do nothing
    ;

    -- create test users and admins
    insert into auth.app_user(
      app_tenant_id
      ,username
      ,recovery_email
      ,password_hash
      ,permission_key
    )
    values 
    (
      (select id from auth.app_tenant where identifier = 'test-001')
      ,'testAdmin001'
      ,'testAdmin001@blah.blah'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'Admin'
    )
    ,(
      (select id from auth.app_tenant where identifier = 'test-001')
      ,'testUser001'
      ,'testUser001@blah.blah'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'User'
    )
    ,(
      (select id from auth.app_tenant where identifier = 'test-002')
      ,'testAdmin002'
      ,'testAdmin002@blah.blah'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'Admin'
    )
    ,(
      (select id from auth.app_tenant where identifier = 'test-002')
      ,'testUser002'
      ,'testUser002@blah.blah'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'User'
    )
    ,(
    (select id from auth.app_tenant where identifier = 'test-003')
      ,'testAdmin003'
      ,'testAdmin003@blah.blah'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'Admin'
    )
    ,(
      (select id from auth.app_tenant where identifier = 'test-003')
      ,'testUser003'
      ,'testUser003@blah.blah'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'User'
    )
    on conflict (username)
    do nothing
    ;

    insert into org.organization(
      app_tenant_id
      ,actual_app_tenant_id
      ,name
      ,is_app_tenant
      ,external_id
    )
    select
      ten.id
      ,ten.id
      ,ten.name
      ,true
      ,ten.identifier || '-org'
    from auth.app_tenant ten
    on conflict(actual_app_tenant_id)
    do nothing
    ;

    insert into org.contact(
      app_tenant_id
      ,app_user_id
      ,organization_id
      ,first_name
      ,last_name
      ,email
      ,external_id
    )
    select
      au.app_tenant_id
      ,au.id
      ,(select id from org.organization where app_tenant_id = au.app_tenant_id)
      ,au.username
      ,'Test'
      ,recovery_email
      ,au.username
    from auth.app_user au
    on conflict
    do nothing
    ;

    select name, identifier from auth.app_tenant;
    select username, recovery_email, app_tenant_id from auth.app_user;
    select name, is_app_tenant, app_tenant_id from org.organization;
    select email, app_tenant_id, organization_id from org.contact;

-- ROLLBACK;
COMMIT;
