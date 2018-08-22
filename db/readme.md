# phile-cli

## a tool to manage the development, versioning, and deployment of postgraphile projects

install the cli
```
npm install -g phile-cli
```

create a new project in a specified subdirectory
```
philec create-project db
cd db
npm i
```
tell phile-cli about your config values (this creates a config file for you).  the user should have superuser privelidges on the database.
```
philec config 
  --connection postgres://user:pwd@host/db
  --schemasToGrapql "schema1,schema2"
  --port 3000
  --pgDefaultRole some_role
  --jwtTypeIdentifier schema.type
  --jwtSecret some_secret
  ... this really needs to mirror postgraphile config structure
```
configure philec git branches.  these are the default values if you skip this step
```
philec set-git --logical dev --remote dev
philec set-git --logical master --remote master
```
others that have no value until set
```
philec set-git --logical stage --remote stage
philec set-git --logical demo --remote demo
philec set-git --logical prod --remote prod
philec set-git --logical whatevs --remote whatevs
```

now we are ready to start creating our database packages.  when creating major, minor, or patch packages, the cli will create proper files in the package structure to all sqitch to later manage deployments.  files that exist will never be overwritten by default.

we start by creating a new release/feature/patch.
```
philec new-release --name my-first-release
philec new-feature --name my-first-feature
philec new-patch --name my-first-patch
```
this minimal command will create a subdirectiory structure as follows
```
--patches
  |_0010-my-first-release
    |_0010-my-first-feature
      |_deploy
        |_data_updates
        |_documentation
        |_functions
        |_permissions
        |_roles
        |_structure
          |_020-0010-my-first-patch.sql
        |_triggers
        |_user_types
        |_views
      |_revert
        |_data_updates
        |_documentation
        |_functions
        |_permissions
        |_roles
        |_structure
          |_020-0010-my-first-patch.sql
        |_triggers
        |_user_types
        |_views
      |_verify
        |_data_updates
        |_documentation
        |_functions
        |_permissions
        |_roles
        |_structure
          |_020-0010-my-first-patch.sql
        |_triggers
        |_user_types
        |_views
      |_test
        |_0010-my-first-feature.test.010.sql
      |_sqitch.plan
```
phile-cli follows semantic versioning, for the most part.

within each patch, scripts are separated by artifact-type.  during deployment, they are applied by group in the following order:
```
- roles
- user_types
- structure
- data_updates
- functions
- triggers
- views
- permissions
- documentation
```
with this command
```
philec deploy
```
additionally, this command
```
philec functions
```
will rollback and deploy only these artifacts
```
- functions
- triggers
- views
- permissions
- documentation
```
feature development usually consists of a few phases
- __structure definition__ 
  - new tables/fields/relationships/etc are added to the current model.
  - these are often well-defined in the first iteration or two of any particular effort.
  - still, the ability to completely rework structure quickly is supported
- __business logic development__
  - all artifacts from functions-to-documentation are more volatile than structure(roles-to-data_updates)
  - during development, these generally go thru many iterations
  - *_philec functions_* command updates these while preserving structure and data state  
- __testing__
  - sql tests are optionally and automatically executed after each deployment during the dev cycle
## THE DEV CYCLE ##
so a workflow for working on a particular feature my look like:
```
çphilec new-feature --name new-feature
philec new-patch --name new-function-1 --type function
philec new-patch --name new-function-2 --type function
```
which updates directory structure to the following (collapsed)
```
--patches
  |_0010-my-first-release
    |_0010-my-first-feature
    |_0020-new-feature
      |_deploy
        |_function
          |_040-0010-new-function-1.sql
          |_040-0020-new-function-2.sql
      |_revert
      |_verify
      |_test
        |-020-0010-my-first-feature.test.010.sql
        |-040-0010-new-function-1.test.010.sql
        |-040-0020-new-function-2.test.010.sql
      |_sqitch.plan
```
we always work within the context of one feature at a time.
```
philec dev-feature --name 0020-new-feature
```
this command will cause most other commands to work within the context of the specified feature
```
philec deploy
philec revert
philec test
philec functions (we will use this one a lot as we dev our functions)
```
sometimes we need to do things on a bigger scale

to deploy the entire db
```
phile dev-feature clear
phile deploy
... or
phile deploy --all
```
if you have .bak of your db that is your baseline for the current dev cycle.  note that you could manage multiple baseline .bak files with this
```
philec set-baseline-bak --path /path/to/file --name some_name
```
then you can restore and rebuild everythings with one command that restores the db and deploys all features currently being worked on
```
philec restore-baseline --name some_name
...also
philec set-default-baseline --name some_name
philec restore-baseline
```
by default, philec will enforce that changes can only be made directly to *_dev_* branch by checking *_git branch_* behind the scenes when philec commands are executed.

pushes to the dev environment will happen regularly.  this is accomplished with
```
philec deploy --env dev
```
under the covers, this does some git tagging housekeeping and executes an ansible script to push the latest db packages to the dev server, restore the current baseline, and deploy all current features
```
sqitch tag v0010.0010.040.0020 -n 'Tag v0010.0010.040.0020-dev-1'  (dev-# increments)
git tag v0010.0010.040.0020 -am 'Tag v0010.0010.040.0020-dev-1'  (dev-# increments)
git push
ansible deploy-dev //sorta
```
once dev is verified it is time to release to master
```
philec merge --from dev --to master
```
this command does a bunch of housework
```
git checkout master
git merge dev
sqitch tag v0010.0010.040.0020 -n 'Tag v0010.0010.040.0020-master-1'
git tag v0010.0010.040.0020 -am 'Tag v0010.0010.040.0020-master-1'
git push
git checkout dev
update .gitignore to include released directories
git commit -am 'update .gitignore to include release'
git checkout master
git merge dev
git push
git checkout dev
```
deploy to prod
```
philec deploy --env prod
```
... and repeat THE DEV CYCLE

## Additional Features ##
### Canned Packages ###
philec comes with a number of pre-defined packages that implement useful schemas that pop up in many projects, including:
- **auth**: provides basic jwt authorization, multi-tenent support, user login and management
- **org**: organization/contact/facility/location support that is extensible for new apps
- **prj**: project/milestone/task management to support generic business processes
- **msg**: support for in-app/email/sms messaging between users
- **evt**: a model to support event-driven microservices
- **jobs**: work-queue management using pg_notify to trigger and manage automated workflow and app tasks
- others may follow...
  
to include a canned package
```
philec new-feature --canned-package auth
```
this will give a new feature, keeping with our example, it would be: **0030-auth**
### Migration Migrator ###
a tool to convert knex-migrate based packages to philec packages