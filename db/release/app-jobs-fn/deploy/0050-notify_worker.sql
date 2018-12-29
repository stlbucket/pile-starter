-- Deploy app_jobs_fn:trigger/notify_worker to pg
-- requires: structure/schema
-- requires: app-jobs:function/do_notify

BEGIN;

  CREATE TRIGGER _900_notify_worker AFTER INSERT ON app_jobs.job FOR EACH STATEMENT EXECUTE PROCEDURE app_jobs_fn.do_notify('jobs:insert');

COMMIT;
