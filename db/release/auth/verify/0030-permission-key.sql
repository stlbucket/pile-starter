-- Verify auth:0030-permission-key on pg

BEGIN;

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'permission_key'
      and e.enumlabel = 'SuperAdmin'
      and n.nspname = 'auth';

  select
  1/count(*)
--       n.nspname as enum_schema,
--        t.typname as enum_name,
--         e.enumlabel as enum_value
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'permission_key'
      and e.enumlabel = 'Admin'
      and n.nspname = 'auth';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'permission_key'
      and e.enumlabel = 'Demon'
      and n.nspname = 'auth';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'permission_key'
      and e.enumlabel = 'User'
      and n.nspname = 'auth';

ROLLBACK;
