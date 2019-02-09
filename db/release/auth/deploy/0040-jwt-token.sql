-- Deploy auth:0040-jwt-token to pg
-- requires: 0030-permission-key

BEGIN;

  CREATE type auth.jwt_token AS (
    role text,
    app_user_id text,
    app_tenant_id text,
    token text
  );

COMMIT;
