-- Deploy auth:structure/extensions to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_background;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

COMMIT;
