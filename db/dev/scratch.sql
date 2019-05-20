  comment on column org.contact.id is
  E'@omit create';
  comment on column org.contact.created_at is
  E'@omit create,update';
  comment on column org.contact.updated_at is
  E'@omit create,update';
  comment on column org.contact.organization_id is
  E'@omit create,update';
  comment on column org.contact.app_tenant_id is
  E'@omit create, update'; -- id is always set by the db.  this might change in an event-sourcing scenario
