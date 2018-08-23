const pm2 = require("pm2")
const Promise = require('bluebird')
const { makeExtendSchemaPlugin, gql } = require("graphile-utils");

const Pm2ProcessesPlugin = makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
    type SyncProcess {
      pid: String!
      name: String!
      status: String!
    }

    type SyncProcessCollection {
      nodes: [SyncProcess]!
    }

    extend type Query {
      syncProcesses: SyncProcessCollection!
    }
  `,
  resolvers: {
      Query: {
        syncProcesses: async (
          _query,
          args,
          context,
          resolveInfo,
          { selectGraphQLResultFromTable }
        ) => {
          const d = Promise.defer()

          pm2.connect(function(err) {
            if (err) {
              throw err
            }
            
            pm2.list({
            }, function(err, apps) {
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