-- Verify auth-fn:build_app_tenant on pg

BEGIN;

  SELECT has_function_privilege('auth_fn.build_app_tenant(text, text)', 'execute');

ROLLBACK;
