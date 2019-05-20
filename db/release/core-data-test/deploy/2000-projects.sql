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


insert into prj.project(
  app_tenant_id
  ,name
  ,identifier
)
select
  apt.id
  ,'Phinish Phile-Starter'
  ,'phinish-phile-starter'
from auth.app_tenant apt
where apt.identifier = 'anchor'
on conflict (app_tenant_id, identifier)
do nothing
;

insert into prj.milestone(
  app_tenant_id
  ,project_id
  ,name
  ,description
  ,identifier
)
values
  (
    (select app_tenant_id from prj.project where identifier = 'phinish-phile-starter')
    ,(select id from prj.project where identifier = 'phinish-phile-starter')
    ,'Complete Default Components'
    ,'Refactor default components for reusablility and add create/edit capability'
    ,'complete-default-components'
  )
on conflict (project_id, name)
do nothing
;

insert into prj.task(
  app_tenant_id
  ,project_id
  ,milestone_id
  ,name
  ,description
  ,identifier
)
values
  (
    (select app_tenant_id from prj.milestone where identifier = 'complete-default-components')
    ,(select project_id from prj.milestone where identifier = 'complete-default-components')
    ,(select id from prj.milestone where identifier = 'complete-default-components')
    ,'Build CreateEntityVuetify.vue'
    ,'A component to support default create behavior'
    ,'build-create-entity-vuetify'
  )
on conflict (milestone_id, name)
do nothing
;

\echo projects
select * from prj.project;
\echo milestones
select name, description, identifier from prj.milestone;
\echo tasks
select name, description, identifier from prj.task;

COMMIT;
