const {ApolloEngine} = require('apollo-engine');

const express = require("express");
const {postgraphile} = require("postgraphile");

const app = express();

app.use(postgraphile(
  "postgres://localhost/phile"
  ,["auth" ,"auth_fn","org","org_fn","ex","ex_fn"]
  ,{
    dynamicJson: true
    ,pgDefaultRole: 'app_anonymous'
    ,jwtSecret: 'SUPERSECRET'
    ,jwtPgTypeIdentifier: 'auth.jwt_token'
    ,extendedErrors: ['hint', 'detail', 'errcode']
    ,disableDefaultMutations: true
  }
));

const engine = new ApolloEngine({
  apiKey: "service:stlbucket-4863:E1JvHPJjVn04vWxTF9w2PQ"
});

// engine.listen({
//   port: 5000,
//   expressApp: app
// });

app.listen(5000)


console.log('listening on 5000')