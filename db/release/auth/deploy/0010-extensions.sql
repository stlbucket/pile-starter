-- Deploy auth:0010-extensions to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

COMMIT;
