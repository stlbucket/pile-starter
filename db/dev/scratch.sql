  -- comment on TABLE org.organization is E'@foreignKey (actual_app_tenant_id) references auth.vw_app_tenant(id)';


  create policy super_aadmin_organization on org.organization for all to app_super_admin  -- sql action could change according to your needs
  using (true);  -- this function could be replaced entirely or on individual policies as needed
