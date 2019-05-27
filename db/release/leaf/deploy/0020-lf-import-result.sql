-- Deploy leaf:structure/lf_import_result to pg
-- requires: structure/schema

begin;

  create table leaf.lf_import_result (
    id text not null check (id != '') unique,
    description text,
    constraint pk_lf_import_result primary key (id)
  );

commit;
