-- Verify auth-fn:current_app_user on pg

BEGIN;

  SELECT has_function_privilege('auth_fn.current_app_user()', 'execute');

ROLLBACK;
