-- Verify auth:structure/extensions on pg

BEGIN;

  SELECT 1/count(*) FROM pg_extension WHERE extname = 'pgcrypto';
  SELECT 1/count(*) FROM pg_extension WHERE extname = 'uuid-ossp';

ROLLBACK;
