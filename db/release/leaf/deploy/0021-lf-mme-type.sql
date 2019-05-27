-- Deploy leaf:structure/lf_mme_type to pg
-- requires: structure/schema

begin;

  create table leaf.lf_mme_type (
    id text not null check (id != '') unique,
    description text,
    constraint pk_lf_mme_type primary key (id)
  );

commit;
