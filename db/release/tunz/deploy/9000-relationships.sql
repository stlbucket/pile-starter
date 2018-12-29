-- Deploy tunz:structure/show to pg
-- requires: structure/schema

BEGIN;
  --||--
  ALTER TABLE tunz.show ADD CONSTRAINT fk_show_booker FOREIGN KEY ( booker_id ) REFERENCES tunz.booker( id );
  --||--
  ALTER TABLE tunz.show ADD CONSTRAINT fk_show_promoter FOREIGN KEY ( promoter_id ) REFERENCES tunz.promoter( id );
  --||--
  ALTER TABLE tunz.show ADD CONSTRAINT fk_show_sound_person FOREIGN KEY ( sound_person_id ) REFERENCES tunz.sound_person( id );
  --||--
  ALTER TABLE tunz.session_player ADD CONSTRAINT fk_session_player_instrument FOREIGN KEY ( instrument_id ) REFERENCES tunz.instrument( id );

COMMIT;
