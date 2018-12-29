-- Deploy app_jobs_fn:function/0020-do_notify to pg
-- requires: structure/0010-schema

BEGIN;

  CREATE FUNCTION app_jobs_fn.do_notify() RETURNS trigger AS $$
  BEGIN
    PERFORM pg_notify(TG_ARGV[0], '');
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

COMMIT;
