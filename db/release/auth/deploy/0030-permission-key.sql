-- Deploy auth:0030-permission-key to pg
-- requires: 0020-schema

BEGIN;

CREATE TYPE auth.permission_key AS ENUM (
  'Admin',
  'SuperAdmin',
  'Demon',
  'User'
);

COMMIT;
