-- Verify evt:custom-type/evt_processing_result on pg

BEGIN;

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'evt_processing_result'
      and e.enumlabel = 'Captured'
      and n.nspname = 'evt';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'evt_processing_result'
      and e.enumlabel = 'Consumed'
      and n.nspname = 'evt';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'evt_processing_result'
      and e.enumlabel = 'Error'
      and n.nspname = 'evt';

  select
  1/count(*)
      from pg_type t
         join pg_enum e on t.oid = e.enumtypid
         join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      where t.typname = 'evt_processing_result'
      and e.enumlabel = 'Acknowledged'
      and n.nspname = 'evt';


ROLLBACK;
