

create a new devops project 
clone all the phile starter repos
create repos in new project
copy ps-demo directory to YOUR-PROJECT
update all files appropriately

- az-config
  - YOUR-PROJECT/config.yml
- api
  - azure-pipelines.yml
- db
- cli
- web-vue
  - in devops project settings, create service connection to **-rg-master to support file copy to storage blob
  - azure-pipelines.yml
```
cd az-config/YOUR-PROJECT


ansible-playbook create-all.yml --verbose
```

grant access to client ip in db resource on portal (manual step could automate)

update cmd.config to deploy desired schemata

```
./cmd/deploy - this will dep
```

-- this will allow the postgraphile server to switch roles on login, etc
grant app_super_admin to psdemoadmin;




az devops service-endpoint list --project phile-starter --organization https://dev.azure.com/stlbucket --output table