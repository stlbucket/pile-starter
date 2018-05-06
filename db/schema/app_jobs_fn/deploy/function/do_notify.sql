-- Deploy app_jobs_fn:do_notify to pg
-- requires: structure/schema

BEGIN;

  CREATE FUNCTION app_jobs_fn.do_notify() RETURNS trigger AS $$
  BEGIN
    PERFORM pg_notify(TG_ARGV[0], '');
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

COMMIT;
