-- Deploy auth:custom-type/permission-key to pg
-- requires: structure/schema

BEGIN;

CREATE TYPE auth.permission_key AS ENUM (
  'Admin',
  'SuperAdmin',
  'Demon',
  'User'
);

COMMIT;
