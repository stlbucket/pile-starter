-- Revert prj:structure/9000-relationships from pg

BEGIN;
-- project
ALTER TABLE prj.project DROP CONSTRAINT fk_project_app_tenant;

-- milestone
ALTER TABLE prj.milestone DROP CONSTRAINT fk_milestone_app_tenant;
ALTER TABLE prj.milestone DROP CONSTRAINT fk_milestone_project;

-- task
ALTER TABLE prj.task DROP CONSTRAINT fk_task_app_tenant;
ALTER TABLE prj.task DROP CONSTRAINT fk_task_project;
ALTER TABLE prj.task DROP CONSTRAINT fk_task_milestone;

-- task_role
ALTER TABLE prj.task_role DROP CONSTRAINT fk_task_role_app_tenant;

-- contact_task_role
ALTER TABLE prj.contact_task_role DROP CONSTRAINT fk_contact_task_role_app_tenant;
ALTER TABLE prj.contact_task_role DROP CONSTRAINT fk_contact_task_role_task;
ALTER TABLE prj.contact_task_role DROP CONSTRAINT fk_contact_task_role_contact;
ALTER TABLE prj.contact_task_role DROP CONSTRAINT fk_contact_task_role_task_role;

-- prj_note
ALTER TABLE prj.prj_note DROP CONSTRAINT fk_prj_note_app_tenant;
ALTER TABLE prj.prj_note DROP CONSTRAINT fk_prj_note_contact;

-- task_note
ALTER TABLE prj.task_note DROP CONSTRAINT fk_task_note_app_tenant;
ALTER TABLE prj.task_note DROP CONSTRAINT fk_task_note_prj_note;
ALTER TABLE prj.task_note DROP CONSTRAINT fk_task_note_task;

-- project_note
ALTER TABLE prj.project_note DROP CONSTRAINT fk_project_note_app_tenant;
ALTER TABLE prj.project_note DROP CONSTRAINT fk_project_note_prj_note;
ALTER TABLE prj.project_note DROP CONSTRAINT fk_project_note_project;

-- milestone_note
ALTER TABLE prj.milestone_note DROP CONSTRAINT fk_milestone_note_app_tenant;
ALTER TABLE prj.milestone_note DROP CONSTRAINT fk_milestone_note_prj_note;
ALTER TABLE prj.milestone_note DROP CONSTRAINT fk_milestone_note_milestone;

-- task_dependency
ALTER TABLE prj.task_dependency DROP CONSTRAINT fk_task_dependency_app_tenant;
ALTER TABLE prj.task_dependency DROP CONSTRAINT fk_task_dependency_parent;
ALTER TABLE prj.task_dependency DROP CONSTRAINT fk_task_dependency_child;

-- milestone_dependency
ALTER TABLE prj.milestone_dependency DROP CONSTRAINT fk_milestone_dependency_app_tenant;
ALTER TABLE prj.milestone_dependency DROP CONSTRAINT fk_milestone_dependency_parent;
ALTER TABLE prj.milestone_dependency DROP CONSTRAINT fk_milestone_dependency_child;

COMMIT;
