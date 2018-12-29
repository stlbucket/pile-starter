-- Revert tunz:structure/sound_person from pg

BEGIN;

  DROP TRIGGER IF EXISTS tg_timestamp_update_sound_person ON tunz.sound_person;

  DROP FUNCTION IF EXISTS tunz.fn_timestamp_update_sound_person();

  DROP TABLE IF EXISTS tunz.sound_person CASCADE;

COMMIT;
