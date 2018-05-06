-- Deploy app_jobs:structure/schema to pg
-- requires: app_roles:roles
-- requires: auth:structure/schema

BEGIN;

  CREATE SCHEMA IF NOT EXISTS app_jobs;

  GRANT usage ON SCHEMA app_jobs TO app_user;

COMMIT;
