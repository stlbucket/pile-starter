-- Deploy auth:0070-token to pg
-- requires: 0060-app-user

BEGIN;

CREATE TABLE auth.token (
  id bigint UNIQUE NOT NULL DEFAULT shard_1.id_generator(),
  app_user_id bigint NOT NULL UNIQUE,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  expires_at timestamp NOT NULL DEFAULT current_timestamp + interval '20 minute',
  CONSTRAINT pk_token PRIMARY KEY (id)
);
--||--
ALTER TABLE auth.token ADD CONSTRAINT fk_token_user FOREIGN KEY ( app_user_id ) REFERENCES auth.app_user( id );
--||--
GRANT select ON TABLE auth.token TO app_user;
-- GRANT insert ON TABLE auth.token TO app_user;
-- GRANT update ON TABLE auth.token TO app_user;
-- GRANT delete ON TABLE auth.token TO app_user;
  alter table auth.token enable row level security;
  --||--
  create policy select_token on auth.token for select
    using (app_user_id = current_setting('jwt.claims.app_user_id')::bigint);


comment on table auth.token is E'@omit create,update,delete';
comment on column auth.token.created_at is E'@omit create,update';
comment on column auth.token.expires_at is E'@omit create,update';

COMMIT;
