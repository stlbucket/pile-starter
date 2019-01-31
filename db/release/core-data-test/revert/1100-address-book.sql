-- Revert core-data-test:test-tenent from pg

BEGIN;

DELETE FROM org.contact_app_user where contact_id not in (select id from org.contact where external_id = 'appsuperadmin');

DELETE FROM org.contact where external_id != 'appsuperadmin';

DELETE FROM org.facility;

DELETE FROM org.organization;

DELETE FROM org.location;

COMMIT;
