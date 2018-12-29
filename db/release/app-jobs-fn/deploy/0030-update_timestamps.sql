-- Deploy function/0030-update_timestamps to pg
-- requires: function/0020-do_notify

BEGIN;

  CREATE FUNCTION app_jobs_fn.update_timestamps() RETURNS trigger AS $$
  BEGIN
    IF TG_OP = 'INSERT' THEN
      NEW.created_at = NOW();
      NEW.updated_at = NOW();
    ELSIF TG_OP = 'UPDATE' THEN
      NEW.created_at = OLD.created_at;
      NEW.updated_at = GREATEST(NOW(), OLD.updated_at + INTERVAL '1 millisecond');
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_jobs.job FOR EACH ROW EXECUTE PROCEDURE app_jobs_fn.update_timestamps();

COMMIT;
