-- Revert org:function/current_app_user_contact from pg

BEGIN;

  DROP FUNCTION IF EXISTS org_fn.current_app_user_contact();

COMMIT;
