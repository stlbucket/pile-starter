-- Revert auth-fn:current_app_tenant_id from pg

BEGIN;

  SELECT has_function_privilege('auth_fn.current_app_tenant_id()', 'execute');

COMMIT;
