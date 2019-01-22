
const { makeExtendSchemaPlugin, makeProcessSchemaPlugin, gql } = require("graphile-utils");


module.exports = makeProcessSchemaPlugin(schema => {
  console.log(schema._typeMap.CoolJson)
  return schema
});

// module.exports = makeExtendSchemaPlugin(build => {
//   const { pgSql: sql } = build;
//   return {
//     typeDefs: gql`
//     type CoolJson {
//       stuff: String!
//     }

//   `,
//   // resolvers: {
//   //     Query: {
//   //       SpecialJson: {
//   //         someCoolJson: async (
//   //           _mutation,
//   //           args,
//   //           context,
//   //           resolveInfo,
//   //           { selectGraphQLResultFromTable }
//   //         ) => {
//   //           const { pgClient } = context;
//   //           // Start a sub-transaction
//   //           await pgClient.query("SAVEPOINT graphql_mutation");
//   //           try {
  
//   //             // clog('LET US EXEC SQL', pgClient)
//   //             const result = await pgClient.query(args.input.sql, []);
  
//   //             await pgClient.query("RELEASE SAVEPOINT graphql_mutation");
  
//   //             return {
//   //               sql: args.input.sql,
//   //               result: result
//   //             };
//   //           } catch (e) {
//   //             // Oh noes! If at first you don't succeed,
//   //             // destroy all evidence you ever tried.
//   //             await pgClient.query("ROLLBACK TO SAVEPOINT graphql_mutation");
//   //             throw e;
//   //           }
//   //         },
//   //       }
//   //     },
//   //   },
//   };
// });

// const { makeWrapResolversPlugin } = require("graphile-utils");

// module.exports = makeWrapResolversPlugin({
//   SpecialJson: {
//     async someCoolJson(resolve, source, args, context, resolveInfo) {
//       const result = await resolve();
//       console.log('source', source)
//       console.log('args', args)
//       console.log('context', context)
//       console.log('resolveInfo', resolveInfo)
//       console.log('specialJson.someCoolJson', JSON.stringify(result,null,2))
//       return result;
//     },
//   },
// });
