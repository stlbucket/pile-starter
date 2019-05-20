// require('./.env')
const {ApolloEngine} = require('apollo-engine');
const express = require("express");
const {postgraphile, makePluginHook} = require("postgraphile");
const pgdbi = require('postgraphile-db-inspector-extension')
const pluginHook = makePluginHook([pgdbi]);

const port = process.env.PORT
const connection = process.env.POSTGRES_CONNECTION
const schemas = process.env.POSTGRAPHILE_SCHEMAS.split(',')
const dynamicJson = process.env.DYNAMIC_JSON === 'true'
const pgDefaultRole = process.env.DEFAULT_ROLE
const jwtSecret = process.env.JWT_SECRET
const jwtPgTypeIdentifier = process.env.JWT_PG_TYPE_IDENTIFIER
const extendedErrors = process.env.EXTENDED_ERRORS.split(',')
const disableDefaultMutations = process.env.DISABLE_DEFAULT_MUTATIONS === 'true'
const enableApolloEngine = process.env.ENABLE_APOLLO_ENGINE === 'true'
const apolloApiKey = process.env.APOLLO_ENGINE_API_KEY
const watchPg = process.env.WATCH_PG === 'true'
const graphiql = process.env.GRAPHIQL === 'true'
const enableCors = process.env.ENABLE_CORS === 'true'
const fs = require('fs')

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('schemas', schemas)

try {
  const azcon = {
    database : 'phile_starter',
    host     : "ps-demo-db-dev.postgres.database.azure.com",
    user     : 'psdemoadmin@ps-demo-db-dev',
    password : 'LL38f7ooLL38f7oo',
    // this object will be passed to the TLSSocket constructor
    ssl : {
      rejectUnauthorized : false,
      ca   : fs.readFileSync("root.crt").toString(),
      // key  : fs.readFileSync("/path/to/client-key/maybe/postgresql.key").toString(),
      // cert : fs.readFileSync("/path/to/client-certificates/maybe/postgresql.crt").toString(),
    }
  }
  const app = express();
  const engine = new ApolloEngine({
    apiKey: apolloApiKey
  });
  
  app.use(postgraphile(
    azcon
    ,schemas
    ,{
      pluginHook
      ,enablePgdbi: true
      ,dynamicJson: dynamicJson
      ,pgDefaultRole: pgDefaultRole
      ,jwtSecret: jwtSecret
      ,jwtPgTypeIdentifier: jwtPgTypeIdentifier
      ,pgDefaultRole: pgDefaultRole
      ,showErrorStack: true
      ,extendedErrors: ['severity', 'code', 'detail', 'hint', 'positon', 'internalPosition', 'internalQuery', 'where', 'schema', 'table', 'column', 'dataType', 'constraint', 'file', 'line', 'routine']
      ,disableDefaultMutations: disableDefaultMutations
      ,watchPg: watchPg
      ,ignoreRBAC: false  // postgraphile 5.0 plans to make this default to false so hardcoding to this default for now
      ,graphiql: graphiql
      ,enhanceGraphiql: graphiql
      ,enableCors: enableCors
      ,appendPlugins: [
        require('postgraphile-plugin-connection-filter')
      ]
      ,graphileBuildOptions: {
        enablePgDbInspector: true
        // ,connectionFilterComputedColumns: false
        // ,connectionFilterSetofFunctions: false
        // ,connectionFilterLists: false
      }
    }
  ));

  
  app.use(express.static('/web-dist'))

  app.get('/', (req, res) => {
    res.redirect('/web-dist/index.html')
  })

  
  if (enableApolloEngine) {
    engine.listen({
      port: port,
      expressApp: app
    });
  } else {
    app.listen(port)
  }
  
  console.log(`listening on ${port}`)
} catch (e) {
  console.log('ERROR', e)
  process.exit(1)
}

// const app = express()
// // const port = 80

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))