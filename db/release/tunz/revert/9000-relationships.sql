
BEGIN;
  --||--
  ALTER TABLE tunz.show DROP CONSTRAINT fk_show_booker;
  --||--
  ALTER TABLE tunz.show DROP CONSTRAINT fk_show_promoter;
  --||--
  ALTER TABLE tunz.show DROP CONSTRAINT fk_show_sound_person;
  --||--
  ALTER TABLE tunz.session_player DROP CONSTRAINT fk_session_player_instrument;

COMMIT;
