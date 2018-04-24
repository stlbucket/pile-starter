# phile-starter #

<p>
  boilerplate schemas to support quick implementation 
  of <a href="https://www.graphile.org/postgraphile/">postgraphile</a> projects
  using <a href="http://sqitch.org/">sqitch</a> to manage db scripts
</p>

schemas include:
- app-roles: 
  - creates db roles to support postgres rls security
- auth: 
  - app_user management and login support.  
  - this version supports the basic auth described in the postgraphile docs.
  - support for oauth or other strategies may be added here or in an alternate schema flavor
  - requires app-roles
- org: 
  - generic organization/location/contact support.
  - org.contact ==> auth.app_user
  - requires auth
- ex:
  - basic counter example
  - event-driven counter example (first cut - still under development)

## quick usage ##
### install <a href="http://sqitch.org/">sqitch</a> ###

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
rm -rf .git
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
database="[YOUR DATABASE NAME]"
hostname="localhost"

packages=(
  schema/app-roles
  schema/auth
  schema/auth_fn
  schema/org
  schema/org_fn
  core-data
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
assuming you've got postgraphile installed globally:
```
./cmd/server
```

### run unit tests ###
in a second terminal, navigate to **./cli/** and...
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

