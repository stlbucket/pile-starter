const {PgMutationUpsertPlugin} = require("@fullstackio/postgraphile-upsert-plugin")

module.exports = {
  coolJson: require('./cool-json'),
  filter:   require('postgraphile-plugin-connection-filter'),
  upsert: PgMutationUpsertPlugin
}