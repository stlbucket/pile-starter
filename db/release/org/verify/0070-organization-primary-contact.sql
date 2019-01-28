BEGIN;

SELECT
  primary_contact_id
  FROM org.organization
 WHERE FALSE;

ROLLBACK;
