-- Verify msg:0020-message_delivery_status on pg

BEGIN;

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_status'
      and e.enumlabel = 'Requested'
      and n.nspname = 'msg';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_status'
      and e.enumlabel = 'Delivered'
      and n.nspname = 'msg';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_status'
      and e.enumlabel = 'Acknowledged'
      and n.nspname = 'msg';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'message_delivery_status'
      and e.enumlabel = 'Answered'
      and n.nspname = 'msg';


ROLLBACK;
