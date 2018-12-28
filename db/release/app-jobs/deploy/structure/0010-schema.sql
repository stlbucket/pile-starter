-- Deploy app-jobs:001-structure/schema to pg
-- requires: app_roles:001-roles
-- requires: auth:structure/schema

BEGIN;

  CREATE SCHEMA IF NOT EXISTS app_jobs;

  GRANT usage ON SCHEMA app_jobs TO app_user;

COMMIT;
