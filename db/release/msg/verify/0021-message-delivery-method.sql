-- Verify msg:0020-message_delivery_method on pg

BEGIN;

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_method'
      and e.enumlabel = 'SMS'
      and n.nspname = 'msg';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_method'
      and e.enumlabel = 'EMAIL'
      and n.nspname = 'msg';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_method'
      and e.enumlabel = 'IN_APP'
      and n.nspname = 'msg';

ROLLBACK;
