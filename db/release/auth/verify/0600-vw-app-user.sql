BEGIN;

  SELECT
    id
  FROM auth.vw_app_user
  WHERE FALSE;

ROLLBACK;
