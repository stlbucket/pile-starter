-- Deploy app:seed-data to pg
-- requires: schema

BEGIN;

  insert into app.application(
    name 
    ,key
  ) 
  values (
    'address book'
    ,'address-book'
  )
  ;

  insert into app.license_type(
    name
    ,key
    ,application_id
  )
  values
  (
    'Address Book'
    ,'address-book'
    ,(select id from app.application where key = 'address-book')
  )
  ;

  insert into app.license(
    app_tenant_id
    ,license_type_id
    ,name
    ,assigned_to_app_user_id
  )
  select
    au.app_tenant_id
    ,lt.id
    ,au.username || ' - ' || lt.name
    ,au.id
  from auth.app_user au
  cross join app.license_type lt
  ;


  -- values
  -- (
  --   (select id from auth.app_tenant where external_id = 'T000001')
  --   ,(select id from app.license_type where key = 'address-book')
  --   ,'Super Admin Address Book License'
  --   ,(select id from auth.app_user where username = 'appsuperadmin')
  -- )
  -- ;

COMMIT;
