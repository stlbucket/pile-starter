exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
`

const upScript = `
-- project
ALTER TABLE prj.project ADD CONSTRAINT fk_project_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );

-- milestone
ALTER TABLE prj.milestone ADD CONSTRAINT fk_milestone_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
ALTER TABLE prj.milestone ADD CONSTRAINT fk_milestone_project FOREIGN KEY ( project_id ) REFERENCES prj.project( id );

-- task
ALTER TABLE prj.task ADD CONSTRAINT fk_task_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
ALTER TABLE prj.task ADD CONSTRAINT fk_task_project FOREIGN KEY ( project_id ) REFERENCES prj.project( id );
ALTER TABLE prj.task ADD CONSTRAINT fk_task_milestone FOREIGN KEY ( milestone_id ) REFERENCES prj.milestone( id );


-- contact_task_role
ALTER TABLE prj.contact_task_role ADD CONSTRAINT fk_contact_task_role_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
ALTER TABLE prj.contact_task_role ADD CONSTRAINT fk_contact_task_role_task FOREIGN KEY ( task_id ) REFERENCES prj.task( id );
ALTER TABLE prj.contact_task_role ADD CONSTRAINT fk_contact_task_role_contact FOREIGN KEY ( contact_id ) REFERENCES soro.contact( id );
ALTER TABLE prj.contact_task_role ADD CONSTRAINT fk_contact_task_role_task_role FOREIGN KEY ( task_role_id ) REFERENCES prj.task_role( id );

-- prj_note
ALTER TABLE prj.prj_note ADD CONSTRAINT fk_prj_note_seller FOREIGN KEY ( seller_id ) REFERENCES soro.seller( id );
ALTER TABLE prj.prj_note ADD CONSTRAINT fk_prj_note_contact FOREIGN KEY ( created_by_contact_id ) REFERENCES soro.contact( id );

-- task_note
ALTER TABLE prj.task_note ADD CONSTRAINT fk_task_note_prj_note FOREIGN KEY ( prj_note_id ) REFERENCES prj.prj_note( id );
ALTER TABLE prj.task_note ADD CONSTRAINT fk_task_note_task FOREIGN KEY ( task_id ) REFERENCES prj.task( id );

-- project_note
ALTER TABLE prj.project_note ADD CONSTRAINT fk_project_note_prj_note FOREIGN KEY ( prj_note_id ) REFERENCES prj.prj_note( id );
ALTER TABLE prj.project_note ADD CONSTRAINT fk_project_note_project FOREIGN KEY ( project_id ) REFERENCES prj.project( id );

-- milestone_note
ALTER TABLE prj.milestone_note ADD CONSTRAINT fk_milestone_note_prj_note FOREIGN KEY ( prj_note_id ) REFERENCES prj.prj_note( id );
ALTER TABLE prj.milestone_note ADD CONSTRAINT fk_milestone_note_milestone FOREIGN KEY ( milestone_id ) REFERENCES prj.milestone( id );

-- cms_project
ALTER TABLE soro.customer ADD CONSTRAINT fk_customer_cms_project FOREIGN KEY ( cms_project_id ) REFERENCES prj.project( id );

-- task_dependency
ALTER TABLE prj.task_dependency ADD CONSTRAINT fk_task_dependency_parent FOREIGN KEY ( parent_task_id ) REFERENCES prj.task( id );
ALTER TABLE prj.task_dependency ADD CONSTRAINT fk_task_dependency_child FOREIGN KEY ( child_task_id ) REFERENCES prj.task( id );

-- milestone_dependency
ALTER TABLE prj.milestone_dependency ADD CONSTRAINT fk_milestone_dependency_parent FOREIGN KEY ( parent_milestone_id ) REFERENCES prj.milestone( id );
ALTER TABLE prj.milestone_dependency ADD CONSTRAINT fk_milestone_dependency_child FOREIGN KEY ( child_milestone_id ) REFERENCES prj.milestone( id );

`
