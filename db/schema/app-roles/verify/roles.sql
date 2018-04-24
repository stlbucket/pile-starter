-- Verify app-roles:roles on pg

BEGIN;

SELECT 1/count(*) FROM pg_roles WHERE rolname='app_super_admin';
SELECT 1/count(*) FROM pg_roles WHERE rolname='app_admin';
SELECT 1/count(*) FROM pg_roles WHERE rolname='app_demon';
SELECT 1/count(*) FROM pg_roles WHERE rolname='app_user';
SELECT 1/count(*) FROM pg_roles WHERE rolname='app_anonymous';

ROLLBACK;
