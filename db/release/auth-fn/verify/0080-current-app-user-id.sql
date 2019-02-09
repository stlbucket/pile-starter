-- Verify auth-fn:current_app_user_id on pg

BEGIN;

  SELECT has_function_privilege('auth_fn.current_app_user_id()', 'execute');

ROLLBACK;
