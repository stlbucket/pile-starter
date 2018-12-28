-- Deploy auth:custom-type/jwt-token to pg
-- requires: structure/schema

BEGIN;

  CREATE type auth.jwt_token AS (
    role text,
    app_user_id text,
    token text
  );

COMMIT;
