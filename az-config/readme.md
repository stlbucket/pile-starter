# phile-starter #

<p>
  boilerplate schemas to support quick implementation 
  of <a href="https://www.graphile.org/postgraphile/">postgraphile</a> projects
  using <a href="http://sqitch.org/">sqitch</a> to manage db scripts
</p>


## quick usage ##
### install <a href="https://www.postgresql.org//">postgres</a> ###

### install <a href="https://sqitch.org/">sqitch</a> ###

### install <a href="https://www.graphile.org/postgraphile/">postgraphile</a> ###
```
npm install -g postgraphile
```

### clone the repo ###
```
git clone https://github.com/stlbucket/phile-starter.git
```
### git on in there ###
```
cd phile-starter
```
### clean out the .git dir ###
```
rm -rf .**git**
```
### init your git ###
```
git init
git add .
git commit -am 'init commit'
```
### create a database ###
```
createdb [YOUR DATABASE NAME]
```
### configure your environment ###
```
cd db
cp cmd.config.example cmd.config
```
... then set your database name in **cmd.config** ...
```
#!/usr/bin/env bash
database="phile"
hostname="localhost"

packages=(
  schema/app-roles
  schema/auth
  schema/auth_fn
  schema/app_jobs
  schema/app_jobs_fn
  schema/evt
  schema/evt_fn
  schema/org
  schema/org_fn
  schema/ex
  schema/ex_fn
  core-data
)

function_packages=(
  schema/app_jobs_fn
  schema/evt_fn
  schema/org_fn
  schema/ex_fn
)
```
... then let phile-starter configure all your packages ...
```
./cmd/configure
```
### deploy ###
```
./cmd/deploy
```
### run the server ###
in a second terminal, navigate to **./api/** and...
```
./cmd/server
```

### run unit tests ###
in a third terminal, navigate to **./cli/** and...
```
npm run test
```

## more things you can do from here ... ##
### look at data resulting from unit tests ##
in **./db/**...
```
./dev/execute unit-test-results
```
### revert ###
```
./cmd/revert
```
### verify ###
```
./cmd/verify
```

work on your schemas individually the <a href="https://metacpan.org/pod/sqitchtutorial">sqitch way</a>

when you're ready to release, tag it:
```
./cmd/tag [tag-name] -n '[tag-message]'
```

base schemas include:

- app-roles:
  - creates db roles to support postgres rls security
- app_jobs
  - process asyncronous jobs on a queue
- auth:
  - app_user management and login support.  
  - this version supports the basic auth described in the postgraphile docs.
  - support for oauth or other strategies may be added here or in an alternate schema flavor
  - requires app-roles
- org:
  - generic organization/location/contact support.
  - org.contact ==> auth.app_user
  - requires auth
- app:
  - component-level licensing support
  - assign licenses to users to grant access to app components
- msg:
  - messaging between app users
  - hook into external services for email, sms, etc
- wf:
  - define custom workflows to be managed through the system
  - user interaction hooks for tasks such as approvals, data input, etc
  - app jobs can automate workflow steps where possible
- prj:
  - manage simple projects
  - projects are made of milestones
  - milestones are made of tasks
  - can build off workflows for project automation
- evt:
  - support for event-sourcing scenarios
- ex:
  - basic counter example
  - event-driven counter example (first cut - still under development - would LOVE feedback on this coz not sure it's the best way to go about it)
