-- Deploy evt-fn:view/vw_evt_processing_status to pg
-- requires: structure/schema

BEGIN;

CREATE VIEW evt_fn.vw_evt_processing_status AS 
  SELECT DISTINCT
    e.app_tenant_id
    ,a.name app_tenant_name
    ,e.name event_name
    ,CASE
      WHEN (SELECT COUNT(*) FROM evt.evt ee WHERE e.name = ee.name and e.app_tenant_id = ee.app_tenant_id AND result = 'Error') > 0 THEN
        'Error'
      ELSE
        'Online'
    END status
  FROM evt.evt e
  JOIN auth.app_tenant a ON e.app_tenant_id = a.id
  ;

--||--
GRANT select ON TABLE evt_fn.vw_evt_processing_status TO app_user;

COMMIT;
