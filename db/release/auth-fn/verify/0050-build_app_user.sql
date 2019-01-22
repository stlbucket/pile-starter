-- Verify auth-fn:build_app_user on pg

BEGIN;

SELECT has_function_privilege('auth_fn.build_app_user(bigint, text, text, text, auth.permission_key)', 'execute');

ROLLBACK;
