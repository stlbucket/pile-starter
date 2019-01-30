-- Deploy core-data:anchor-tenent to pg

BEGIN;

  -- SELECT auth_fn.build_app_tenant(
  --   'Anchor Tenant'
  --   ,'anchor'
  -- )
  -- ;

  -- SELECT auth_fn.build_app_user(
  --   (SELECT id FROM auth.app_tenant WHERE identifier = 'anchor')
  --   ,'appsuperadmin'
  --   ,'badpassword'
  --   ,'appsuperadmin@tst.tst'
  --   ,'SuperAdmin'
  -- )
  -- ;


    insert into auth.app_tenant(name, identifier)
    values
      ('Anchor Tenant', 'anchor')
    on conflict (identifier)
    do nothing
    ;

    insert into auth.app_user(
      app_tenant_id
      ,username
      ,recovery_email
      ,password_hash
      ,permission_key
    )
    values 
    (
      (select id from auth.app_tenant where identifier = 'anchor')
      ,'appsuperadmin'
      ,'appsuperadmin@tst.tst'
      ,public.crypt('badpassword', public.gen_salt('bf'))
      ,'SuperAdmin'
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
    where identifier = 'anchor'
    on conflict(actual_app_tenant_id)
    do nothing
    ;

    insert into org.contact(
      app_tenant_id
      ,organization_id
      ,first_name
      ,last_name
      ,email
      ,external_id
    )
    select
      au.app_tenant_id
      ,(select id from org.organization where app_tenant_id = au.app_tenant_id)
      ,'Super'
      ,'Admin'
      ,recovery_email
      ,au.username
    from auth.app_user au
    where username = 'appsuperadmin'
    on conflict
    do nothing
    ;

    insert into org.contact_app_user(
      contact_id
      ,app_tenant_id
      ,app_user_id
      ,username
    )
    select
      c.id
      ,au.app_tenant_id
      ,au.id
      ,au.username
    from org.contact c
    join auth.app_user au on au.username = c.external_id
    where au.username = 'appsuperadmin'
    on conflict(username)
    do nothing
    ;

COMMIT;
