
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP FUNCTION IF EXISTS leaf.capture_lf_mme(
  text,
  integer,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  leaf.mme_type,
  text,
  text,
  text,
  text,
  text,
  text,
  text
);
`

const upScript = `
CREATE OR REPLACE FUNCTION leaf.capture_lf_mme(
  _global_id text,
  _leaf_id integer,
  _leaf_external_id text,
  _name text,
  _certificate_number text,
  _address1 text,
  _address2 text,
  _city text,
  _state_code text,
  _postal_code text,
  _country_code text,
  _phone text,
  _mme_type leaf.mme_type,
  _code text,
  _sender_receiver text,
  _issuer text,
  _bio_license_number text,
  _fein text,
  _bio_org_id text,
  _bio_location_id text
)
RETURNS leaf.lf_import_result
as $$
DECLARE
  _mme leaf.mme;
  _company soro.company;
  _location soro.location;
  _import_result leaf.lf_import_result;
BEGIN
  _import_result := 'Imported';

  SELECT *
  INTO _mme
  FROM leaf.mme
  WHERE global_id = _global_id;

  select *
  INTO _location
  FROM soro.location
  WHERE biotrack_id = lpad(_bio_license_number::text, 6, '0')
  OR biotrack_id = lpad(replace(_code, 'L', ''), 4, '0')
  OR external_id = _code;

--  RAISE EXCEPTION '_location: %', _location;

  IF _location.id IS NULL THEN
    INSERT INTO
    soro.location(
      external_id,
      leaf_id,
      name,
      address1,
      address2,
      city,
      state,
      zip
    )
    SELECT
      _code,
      _code,
      _name,
      _address1,
      _address2,
      _city,
      _state_code,
      _postal_code
    RETURNING *
    INTO _location;
  END IF;

  SELECT *
  INTO _company
  FROM soro.company
  WHERE location_id = _location.id;

  IF _company.id IS NULL THEN
    INSERT INTO soro.company(
      external_id,
      name,
      licenses,
      company_type,
      location_id
    )
    SELECT
      _certificate_number,
      _name,
      CASE
        WHEN _mme_type = 'dispensary' THEN
          '{"Retailer"}'::soro.state_license_type[]
        WHEN _mme_type = 'production' THEN
          '{"Processor"}'::soro.state_license_type[]
        WHEN _mme_type = 'cultivator' THEN
          '{"Producer"}'::soro.state_license_type[]
        WHEN _mme_type = 'cultivator_production' THEN
          '{"Producer", "Processor"}'::soro.state_license_type[]
        ELSE
          '{}'::soro.state_license_type[]
      END,
      CASE
        WHEN _mme_type = 'lab' THEN
          'QALab'::soro.company_type
        ELSE
          'Vendor'::soro.company_type
      END,
      _location.id
    RETURNING *
    INTO _company;
  END IF;

 RAISE NOTICE '_location.id:  %   _location.external_id: %,   _bio_license_number: %   _code: %', _location.id, _location.external_id, _bio_license_number, _code;

  UPDATE soro.location
  SET
    external_id = _code,
    leaf_id = _code
  WHERE id = _location.id;

  UPDATE soro.company
  SET external_id = _certificate_number
  WHERE location_id = _location.id;

  IF _mme.id IS NULL THEN
    INSERT INTO leaf.mme(
      global_id,
      leaf_id,
      leaf_external_id,
      name,
      certificate_number,
      address1,
      address2,
      city,
      state_code,
      postal_code,
      country_code,
      phone,
      mme_type,
      code,
      sender_receiver,
      issuer,
      fein,
      bio_org_id,
      bio_location_id,
      bio_license_number,
      location_id
    )
    SELECT
      _global_id,
      _leaf_id,
      _leaf_external_id,
      _name,
      _certificate_number,
      _address1,
      _address2,
      _city,
      _state_code,
      _postal_code,
      _country_code,
      _phone,
      _mme_type,
      _code,
      _sender_receiver,
      _issuer,
      _fein,
      _bio_org_id,
      _bio_location_id,
      _bio_license_number,
      _location.id
    RETURNING *
    INTO _mme;
  END IF;

  RETURN _import_result;
END;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION leaf.capture_lf_mme(
  text,
  integer,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  leaf.mme_type,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) TO soro_user;
`
