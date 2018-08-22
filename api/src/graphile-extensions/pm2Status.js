const pm2 = require("pm2")
const Promise = require('bluebird')
const { makeExtendSchemaPlugin, gql } = require("graphile-utils");

const Pm2ProcessesPlugin = makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
    type Process {
      pid: String!
      name: String!
      status: String!
    }

    type ProcessCollection {
      nodes: [Process]!
    }

    extend type Query {
      processes: ProcessCollection!
    }
  `,
  resolvers: {
      Query: {
        Processes: async (
          _query,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) => {
          const d = Promise.defer()

          pm2.connect(function(err) {
            if (err) {
              console.error(err);
              process.exit(2);
            }
            
            pm2.list({
            }, function(err, apps) {
              pm2.disconnect();   // Disconnects from PM2

              if (err) d.reject(err)
              else {
                d.resolve({
                  nodes: apps.map(
                  p => {
                    return {
                      pid: p.pid
                      ,name: p.name
                      ,status: p.pm2_env.status
                    }
                })})  
              }
            })
          })

          return d.promise
        },
      },
    },
  };
});

module.exports = Pm2ProcessesPlugin