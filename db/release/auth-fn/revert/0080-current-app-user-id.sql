-- Revert auth-fn:current_app_user_id from pg

BEGIN;

  DROP POLICY select_app_user_super_admin ON auth.app_user;

  DROP POLICY select_app_user_admin ON auth.app_user;

  DROP POLICY select_app_user_user ON auth.app_user;

  DROP FUNCTION IF EXISTS auth_fn.current_app_user_id() cascade;

COMMIT;
