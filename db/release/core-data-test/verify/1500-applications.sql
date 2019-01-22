-- Verify app:structure/seed-data on pg

BEGIN;

  select 1/(count(*)) from app.application;

ROLLBACK;
