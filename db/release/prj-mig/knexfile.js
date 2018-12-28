const connection = process.env.DB_CONNECTION_STRING ? process.env.DB_CONNECTION_STRING : {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
}

function buildKnexfile () {
  return {
    patch_9_9_9_9_structure: {
      client: 'postgresql',
      connection: connection,
      migrations: {
        directory: `${__dirname}/migrations/structure`,
        tableName: 'public.knex_migrations_patch_9_9_9_9_structure'
      },
    },
    patch_9_9_9_9_functions: {
      client: 'postgresql',
      connection: connection,
      migrations: {
        directory: `${__dirname}/migrations/functions`,
        tableName: 'public.knex_migrations_patch_9_9_9_9_functions'
      },
    },
    patch_9_9_9_9_views: {
      client: 'postgresql',
      connection: connection,
      migrations: {
        directory: `${__dirname}/migrations/views`,
        tableName: 'public.knex_migrations_patch_9_9_9_9_views'
      },
    },
  }
}

module.exports = buildKnexfile
