
-- Deploy prj:structure/0050-contact-task-role to pg
-- requires: prj:structure/0040-task-role

BEGIN;
CREATE TABLE IF NOT EXISTS prj.contact_task_role (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  app_tenant_id bigint NOT NULL,
  name text,
  task_id bigint NOT NULL,
  contact_id bigint NOT NULL,
  task_role_id bigint NOT NULL,
  CONSTRAINT pk_contact_task_role PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE prj.contact_task_role TO soro_user;
COMMIT;
