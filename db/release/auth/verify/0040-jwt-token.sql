-- Verify auth:0040-jwt-token on pg

BEGIN;

  select
  1/count(*)
      from pg_type t
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'jwt_token'
      and n.nspname = 'auth';

ROLLBACK;
