require('./config')
const clog = require('fbkt-clog')
const express = require('express')
const postgraphql = require('postgraphile').postgraphql;
const app = express()
const mutationHooks = require('./src/mutationHooks')

app.use(express.static('dist'))
// app.use(express.static('/home/kevin_burkett/uibucket'))

app.get('/', (req, res) => {
  // res.redirect('/home/kevin_burkett/uibucket/index.html')
  res.redirect('./dist/index.html')
})


const schema = postgraphql(
  process.env.DB_CONNECTION_STRING,
  [ 'soro', 'biotrack', 'soro_auth', 'leaf', 'ucs', 'mtrx', 'soro_auth_adm', 'evt' ],
  {
    graphiql: process.env.GRAPHIQL === 'true',
    pgDefaultRole: process.env.PG_DEFAULT_ROLE,
    jwtPgTypeIdentifier: process.env.JWT_PG_TYPE_IDENTIFIER,
    jwtSecret: process.env.JWT_SECRET,
    disableDefaultMutations: process.env.DISABLE_DEFAULT_MUTATIONS === 'true',
    appendPlugins: mutationHooks,
    dynamicJson: true,
    // disableQueryLog: true,
    extendedErrors: ['detail', 'errcode'],
    graphileBuildOptions: {
      showErrorStack: true,
      connectionFilterOperatorNames: {
        equalTo: "eq",
        notEqualTo: "ne",
        lessThan: "lt",
        lessThanOrEqualTo: "lte",
        greaterThan: "gt",
        greaterThanOrEqualTo: "gte",
        in: "in",
        notIn: "nin",
        contains: "cont",
        notContains: "ncont",
        containsInsensitive: "conti",
        notContainsInsensitive: "nconti",
        startsWith: "starts",
        notStartsWith: "nstarts",
        startsWithInsensitive: "startsi",
        notStartsWithInsensitive: "nstartsi",
        endsWith: "ends",
        notEndsWith: "nends",
        endsWithInsensitive: "endsi",
        notEndsWithInsensitive: "nendsi",
        like: "like",
        notLike: "nlike",
        likeInsensitive: "ilike",
        notLikeInsensitive: "nilike",
      },
    }
    // exportGqlSchemaPath: './schema/soro.schema',
    // exportJsonSchemaPath: './schema/soro_schema.json'
  }
)

app.use(schema)

// app.use('/api', api)
// app.use(function (err, req, res, next) {
//   clog.error('WE GOT US A SERVER SIDE ERROR', err.stack)
//   res.status(500).send('Something broke!')
// })

app.listen(process.env.PORT)

console.log(`listening on ${process.env.PORT}`)
