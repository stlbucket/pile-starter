-- Deploy tunz:structure/track to pg
-- requires: structure/schema

BEGIN;

CREATE TYPE tunz.track_status AS ENUM (
  'Recorded',
  'Rejected',
  'Utilized'
);

COMMIT;
