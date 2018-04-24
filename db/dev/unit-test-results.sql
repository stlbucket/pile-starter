\echo --------------------------------     auth.app_tenant
\echo ----------------------------------------------------
select
  id
  ,name
  ,identifier
from auth.app_tenant;

\echo ----------------------------------     auth.app_user
\echo ----------------------------------------------------
select
  id
  ,username
  ,app_tenant_id
from auth.app_user;

\echo -------------------------------     org.organization
\echo ----------------------------------------------------
select
  id
  ,name
  ,app_tenant_id
  ,external_id
  ,location_id
from org.organization;

\echo ------------------------------------     org.contact
\echo ----------------------------------------------------
select
  id
  ,first_name
  ,last_name
  ,email
  ,app_tenant_id
  ,app_user_id
  ,organization_id
  ,location_id
from org.contact;

\echo -----------------------------------     org.location
\echo ----------------------------------------------------
select
  id
  ,name
  ,external_id
  ,app_tenant_id
from org.location;


\echo -----------------------------------     org.facility
\echo ----------------------------------------------------
select
  id
  ,name
  ,external_id
  ,organization_id
  ,location_id
  ,app_tenant_id
from org.facility;

\echo -----------------------------------     ex.counter
\echo ----------------------------------------------------
select
  id
  ,app_tenant_id
  ,current_value
from ex.counter;

\echo -----------------------------------     ex.counter_evt
\echo ----------------------------------------------------
select
  id
  ,app_tenant_id
  ,current_value
from ex.counter_evt;


\echo -----------------------------------     evt.evt
\echo ----------------------------------------------------
select
  id
  ,name
  ,params
  ,result
from evt.evt;

\echo -----------------------------------     evt.evt
\echo ----------------------------------------------------
select
  app_tenant_name
  ,event_name
  ,status
from evt_fn.vw_evt_processing_status;