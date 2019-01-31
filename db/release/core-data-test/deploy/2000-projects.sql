-- Deploy app:2000-projects to pg

BEGIN;

insert into prj.project(
  app_tenant_id
  ,name
  ,identifier
)
select
  apt.id
  ,apt.name || ' - Default Project'
  ,apt.identifier || '-default-project'
from auth.app_tenant apt
on conflict (app_tenant_id, identifier)
do nothing
;


select * from prj.project;

COMMIT;
