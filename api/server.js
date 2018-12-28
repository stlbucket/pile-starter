require('./.env')
const {ApolloEngine} = require('apollo-engine');
const express = require("express");
const {postgraphile} = require("postgraphile");

const port = process.env.PORT
const connection = process.env.POSTRGRES_CONNECTION
const schemas = process.env.POSTGRAPHILE_SCHEMAS.split(',')
const dynamicJson = process.env.DYNAMIC_JSON === 'true'
const pgDefaultRole = process.env.DEFAULT_ROLE
const jwtSecret = process.env.JWT_SECRET
const jwtPgTypeIdentifier = process.env.JWT_PG_TYPE_IDENTIFIER
const extendedErrors = process.env.EXTENDED_ERRORS.split(',')
const disableDefaultMutations = process.env.DISABLE_DEFAULT_MUTATIONS === 'true'
const enableApolloEngine = process.env.ENABLE_APOLLO_ENGINE === 'true'
const apolloApiKey = process.env.APOLLO_ENGINE_API_KEY

const app = express();
const engine = new ApolloEngine({
  apiKey: apolloApiKey
});

app.use(postgraphile(
  connection
  ,schemas
  ,{
    dynamicJson: dynamicJson
    ,pgDefaultRole: pgDefaultRole
    ,jwtSecret: jwtSecret
    ,jwtPgTypeIdentifier: jwtPgTypeIdentifier
    ,pgDefaultRole: pgDefaultRole
    ,extendedErrors: extendedErrors
    ,disableDefaultMutations: disableDefaultMutations
  }
));

if (enableApolloEngine) {
  engine.listen({
    port: port,
    expressApp: app
  });
} else {
  app.listen(port)
}

console.log(`listening on ${port}`)