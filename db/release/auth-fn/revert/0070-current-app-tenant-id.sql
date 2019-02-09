-- Revert auth-fn:current_app_tenant_id from pg

BEGIN;

  DROP POLICY select_app_tenant_user ON auth.app_tenant;

  DROP POLICY select_app_tenant_admin ON auth.app_tenant;

  DROP FUNCTION IF EXISTS auth_fn.current_app_tenant_id() cascade;

COMMIT;
