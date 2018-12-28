-- Deploy auth:structure/extensions to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

COMMIT;
