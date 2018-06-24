-- Verify auth_fn:function/authenticate on pg

BEGIN;

SELECT has_function_privilege('auth_fn.authenticate(text, text)', 'execute');

ROLLBACK;
